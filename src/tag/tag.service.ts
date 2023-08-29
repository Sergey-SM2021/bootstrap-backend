import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entity/tag.model';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private TagRepo: Repository<Tag>,
  ) {}

  async createTag(tagName: string) {
    const tag = new Tag();
    tag.name = tagName;
    return await this.TagRepo.save(tag);
  }

  async getTag(tagName: string) {
    return await this.TagRepo.findOneBy({ name: tagName });
  }

  async getTags() {
    return await this.TagRepo.find();
  }
}
