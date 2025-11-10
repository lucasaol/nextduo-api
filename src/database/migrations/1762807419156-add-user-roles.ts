import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserRoles1762807419156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        "users",
        new TableColumn({
          name: "role",
          type: "enum",
          enum: ["root", "player"],
          isNullable: false,
          default: `'player'`
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("users", "role");
    }

}
