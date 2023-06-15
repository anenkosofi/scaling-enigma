import { Schema, model } from 'mongoose';
import Joi from 'joi';

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Set text for todo'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    time: {
      start: {
        type: String,
        required: [true, 'Start time is required'],
      },
      end: {
        type: String,
        required: [true, 'End time is required'],
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const addedTodoJoiSchema = Joi.object({
  text: Joi.string().required(),
  completed: Joi.boolean(),
  time: Joi.object({
    start: Joi.string().required(),
    end: Joi.string().required(),
  }),
});

const editedTodoJoiSchema = Joi.object({
  text: Joi.string(),
  completed: Joi.boolean(),
  time: Joi.object({
    start: Joi.string(),
    end: Joi.string(),
  }),
});

export const todoSchemas = {
  addedTodoJoiSchema,
  editedTodoJoiSchema,
};

export const Todo = model('todo', todoSchema);
