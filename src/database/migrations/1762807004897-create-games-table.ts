import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGamesTable1762807004897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "games",
          columns: [
            { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", isNullable: false, default: "uuid_generate_v4()" },
            { name: "name", type: "varchar", length: "255", isNullable: false },
            { name: "image", type: "varchar", length: "255" },
            { name: "created_at", type: "timestamp", default: 'now()', isNullable: false },
            { name: "updated_at", type: "timestamp", isNullable: true },
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("games");
    }

}
