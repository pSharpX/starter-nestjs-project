import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService],
    }).compile();
    service = module.get<ItemService>(ItemService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
