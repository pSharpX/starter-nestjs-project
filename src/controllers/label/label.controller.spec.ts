import { Test, TestingModule } from '@nestjs/testing';
import { LabelController } from './label.controller';

describe('Label Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LabelController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LabelController = module.get<LabelController>(LabelController);
    expect(controller).toBeDefined();
  });
});
