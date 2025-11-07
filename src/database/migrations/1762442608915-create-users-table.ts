import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1762442608915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", isNullable: false, default: "uuid_generate_v4()" },
            { name: "name", type: "varchar", length: "255", isNullable: false },
            { name: "email", type: "varchar", length: "255", isNullable: true },
            { name: "avatar", type: "varchar", length: "255", isNullable: true },
            { name: "bio", type: "varchar", length: "255", isNullable: true },
            { name: "discord_id", type: "varchar", length: "255", isNullable: false },
            { name: "created_at", type: "timestamp", default: 'now()', isNullable: false },
            { name: "updated_at", type: "timestamp", isNullable: true },
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
