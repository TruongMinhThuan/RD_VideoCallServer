import * as yup from 'yup';
import { RequestValidation } from '@validations/request.validation';

const schema = yup.object({
  body: yup.object({
    name: yup.string().required('name is required'),
  }),
});


export const CreateConversationValidation =  RequestValidation(schema)
