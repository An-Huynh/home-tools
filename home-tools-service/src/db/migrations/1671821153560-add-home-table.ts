import { MigrationInterface, QueryRunner } from "typeorm";

export class addHomeTable1671821153560 implements MigrationInterface {
  name = "addHomeTable1671821153560";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "home" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_012205783b51369c326a1ad4a64" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_802e32fab7aff044d78a76eb438" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_45ef03fa4c08177670fa98842cf" DEFAULT getdate(), "ownerId" uniqueidentifier NOT NULL, CONSTRAINT "PK_012205783b51369c326a1ad4a64" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_035a93faff7156577fd3cc0050" ON "home" ("name", "ownerId") `
    );
    await queryRunner.query(
      `ALTER TABLE "home" ADD CONSTRAINT "FK_53d4b8d8a3711c289fd51009b5b" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "home" DROP CONSTRAINT "FK_53d4b8d8a3711c289fd51009b5b"`
    );
    await queryRunner.query(
      `DROP INDEX "IDX_035a93faff7156577fd3cc0050" ON "home"`
    );
    await queryRunner.query(`DROP TABLE "home"`);
  }
}
