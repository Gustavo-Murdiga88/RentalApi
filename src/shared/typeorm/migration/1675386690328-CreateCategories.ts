import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1675386690328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
