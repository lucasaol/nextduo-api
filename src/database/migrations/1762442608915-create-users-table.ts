import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1762442608915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
            { name: "name", type: "varchar" },
            { name: "avatar", type: "varchar", isNullable: true },
            { name: "bio", type: "varchar", isNullable: true },
            { name: "created_at", type: "timestamp", default: 'now()' },
            { name: "updated_at", type: "timestamp", isNullable: true },
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
