import { plainToClass } from 'class-transformer';

export class DtoTransform {
  static transform<REPO, DTO>(dto: REPO): DTO {
    return plainToClass(this, dto) as DTO;
  }
}
