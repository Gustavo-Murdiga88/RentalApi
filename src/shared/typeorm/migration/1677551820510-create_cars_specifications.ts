import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createCarsSpecifications1677551820510
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars_specifications",
        columns: [
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "specification_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKeys("cars_specifications", [
      new TableForeignKey({
        columnNames: ["car_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cars",
        name: "FK_cars_specifications_carid",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      }),
    ]);

    await queryRunner.createForeignKeys("cars_specifications", [
      new TableForeignKey({
        columnNames: ["specification_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
        name: "FK_cars_specifications_categories_id",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("cars_specifications");

    const fk = table?.foreignKeys.filter((item) => item.name?.includes("FK"));

    await queryRunner.dropForeignKeys("cars_specifications", fk || []);

    await queryRunner.dropTable("cars_specifications");
  }
}
