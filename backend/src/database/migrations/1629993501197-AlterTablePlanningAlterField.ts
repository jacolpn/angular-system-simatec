import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTablePlanningAlterField1629993501197
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "planning",
            "concluded",
            new TableColumn({
                name: "situation",
                type: "varchar",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("planning", "situation");
    }
}
