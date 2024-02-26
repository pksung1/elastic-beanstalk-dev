import { PartialType } from '@nestjs/swagger';
import { BasePostDto } from './base-post.dto';

export class FilterPostDto extends PartialType(BasePostDto) {}
