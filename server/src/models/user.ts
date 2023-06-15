import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

interface IUser {
  username: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
  setPassword(password: string): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    accessToken: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.method('setPassword', function setPassword(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
});

userSchema.method(
  'comparePassword',
  function comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
);

const userLoginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const userRegisterJoiSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const userSchemas = {
  userLoginJoiSchema,
  userRegisterJoiSchema,
};

export const User = model<IUser, UserModel>('user', userSchema);
