import { BasePostDto } from './base-post.dto';
import { OmitCreateType } from 'src/lib/dto-helper/OmitCreateType';

export class CreatePostDto extends OmitCreateType(BasePostDto) {}
