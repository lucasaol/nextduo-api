import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRanksTable1762876502135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "ranks",
          columns: [
            { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", isNullable: false, default: "uuid_generate_v4()" },
            { name: "name", type: "varchar", length: "255", isNullable: false },
            { name: "icon", type: "varchar", length: "255" },
            { name: "game_id", type: "uuid" },
            { name: "order", type: "int", isNullable: false, default: 0 },
            { name: "created_at", type: "timestamp", default: "now()", isNullable: false },
            { name: "updated_at", type: "timestamp", isNullable: true },
          ],
          foreignKeys: [
            {
              columnNames: ["game_id"],
              referencedTableName: "games",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("ranks");
    }

}
