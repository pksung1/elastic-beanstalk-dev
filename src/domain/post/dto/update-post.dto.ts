import { OmitUpdateType } from 'src/lib/dto-helper/OmitUpdateType';
import { BasePostDto } from './base-post.dto';

export class UpdatePostDto extends OmitUpdateType(BasePostDto) {}
