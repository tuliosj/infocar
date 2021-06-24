import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVehicles1624487841242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vehicles",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "placa", type: "varchar" },
          { name: "chassi", type: "varchar" },
          { name: "renavam", type: "varchar" },
          { name: "modelo", type: "varchar" },
          { name: "marca", type: "varchar" },
          { name: "ano", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vehicles");
  }
}
