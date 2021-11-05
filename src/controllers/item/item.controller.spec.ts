import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';

describe('Item Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ItemController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ItemController =
      module.get<ItemController>(ItemController);
    expect(controller).toBeDefined();
  });
});
