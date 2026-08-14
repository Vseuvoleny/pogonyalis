import { Test, TestingModule } from '@nestjs/testing';
import { DebriefService } from './debrief.service';

describe('DebriefService', () => {
  let service: DebriefService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebriefService],
    }).compile();

    service = module.get<DebriefService>(DebriefService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
