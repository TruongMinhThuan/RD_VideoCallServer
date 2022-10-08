import { Request } from 'express';
import * as yup from 'yup';
import { validate } from '.';

export const CreateConversationValidation = yup.object({
  body: yup.object({
    name: yup.string().required(),
  }),
});
