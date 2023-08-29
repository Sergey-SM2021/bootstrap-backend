import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teg } from './teg.model';
import { Repository } from 'typeorm';

@Injectable()
export class TegService {
  constructor(
    @InjectRepository(Teg)
    private TegRepo: Repository<Teg>,
  ) {}

  async createTeg(tegName: string) {
    const teg = new Teg();
    teg.name = tegName;
    return await this.TegRepo.save(teg);
  }
}