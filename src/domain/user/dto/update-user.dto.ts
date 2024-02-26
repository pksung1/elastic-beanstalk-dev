import { BaseUserDto } from './base-user.dto';
import { OmitUpdateType } from 'src/lib/dto-helper/OmitUpdateType';

export class UpdateUserDto extends OmitUpdateType(BaseUserDto) {}
