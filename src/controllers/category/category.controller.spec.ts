import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';

describe('Category Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CategoryController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CategoryController =
      module.get<CategoryController>(CategoryController);
    expect(controller).toBeDefined();
  });
});
