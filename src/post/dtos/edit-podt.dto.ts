import { PartialType, OmitType } from '@nestjs/mapped-types'; //instalar npm install --save @nestjs/swagger swagger-ui-express
import { CreatePostDto } from './create-pos.dto';

export class EditPostDto extends PartialType(
  //campos que no quiero que se editen
  OmitType(CreatePostDto, ['slug'] as const),
) {}
