import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsEmpty,
  isNotEmpty,
  isString,
} from 'class-validator';

export default class CreateConversationDTO {
  id?: Number;

  @IsEmail()
  public name: string;

  user_id: Number;
  is_author: Boolean;

  isValidate() {
    return false;
  }
}

export const CreateConversationValidation = (data: CreateConversationDTO) => {
  let a = new CreateConversationDTO();
  return a.isValidate();
};
