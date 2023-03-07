import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRentals1677954592110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "start_date",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "end_date",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "expected_return_date",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "total",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FK_user_id",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Users",
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FK_car_id",
            columnNames: ["car_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cars",
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rentals");
  }
}
