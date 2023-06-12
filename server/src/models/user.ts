import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

interface IUser {
  username: string;
  email: string;
  password: string;
  token: string;
  verify: boolean;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
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
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.method(
  'comparePassword',
  function comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
);

const userJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const userSchemas = {
  userJoiSchema,
};

export const User = model<IUser, UserModel>('User', userSchema);
