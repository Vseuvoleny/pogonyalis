import { MigrationInterface } from "typeorm";

export class RefactorWindField1678901234567 implements MigrationInterface {
  public async up(queryRunner: any): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "debrief"
            DROP COLUMN "wind";
            ADD COLUMN "windFrom" INT,
            ADD COLUMN "windTo" INT,
            ADD COLUMN "windUnit" VARCHAR(4),
            ADD COLUMN "windGusts" INT;
        `);
  }

  public async down(queryRunner: any): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "debrief"
            DROP COLUMN "windFrom",
            DROP COLUMN "windTo",
            DROP COLUMN "windUnit",
            DROP COLUMN "windGusts";
            ADD COLUMN "wind" VARCHAR(255);
        `);
  }
}
