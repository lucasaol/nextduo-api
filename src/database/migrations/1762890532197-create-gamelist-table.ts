import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGamelistTable1762890532197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "gamelist",
          columns: [
            { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", isNullable: false, default: "uuid_generate_v4()" },
            { name: "user_id", type: "uuid" },
            { name: "game_id", type: "uuid" },
            { name: "rank_id", type: "uuid" },
            { name: "created_at", type: "timestamp", default: "now()", isNullable: false },
            { name: "updated_at", type: "timestamp", isNullable: true },
          ],
          foreignKeys: [
            {
              columnNames: ["user_id"],
              referencedTableName: "users",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
            {
              columnNames: ["game_id"],
              referencedTableName: "games",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
            {
              columnNames: ["rank_id"],
              referencedTableName: "ranks",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("gamelist");
    }

}
