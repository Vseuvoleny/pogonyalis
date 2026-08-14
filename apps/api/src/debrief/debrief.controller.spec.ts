import { Test, TestingModule } from "@nestjs/testing";
import { DebriefController } from "./debrief.controller";
import { DebriefService } from "./debrief.service";

describe("DebriefController", () => {
  let controller: DebriefController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebriefController],
      providers: [DebriefService],
    }).compile();

    controller = module.get<DebriefController>(DebriefController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
