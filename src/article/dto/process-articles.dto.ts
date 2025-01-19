import { IsArray, IsUrl } from 'class-validator';

export class ProcessArticlesDto {
  @IsArray()
  @IsUrl({}, { each: true })
  urls: string[];
}
