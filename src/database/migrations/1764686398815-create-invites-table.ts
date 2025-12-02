import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInvitesTable1764686398815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "invites",
          columns: [
            { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", isNullable: false, default: "uuid_generate_v4()" },
            { name: "from_user_id", type: "uuid", isNullable: false },
            { name: "to_user_id", type: "uuid", isNullable: false },
            { name: "game_id", type: "uuid", isNullable: false },
            { name: "message", type: "varchar", length: "255", isNullable: true },
            { name: "status", type: "enum", enum: ["pending", "accepted", "rejected", "cancelled"], isNullable: false, default: `'pending'` },
            { name: "created_at", type: "timestamp", default: "now()", isNullable: false },
            { name: "updated_at", type: "timestamp", isNullable: true },
          ],
          foreignKeys: [
            {
              columnNames: ["from_user_id"],
              referencedTableName: "users",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
            {
              columnNames: ["to_user_id"],
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
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("invites");
    }

}
