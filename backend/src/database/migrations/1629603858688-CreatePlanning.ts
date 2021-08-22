import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePlanning1629603858688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "planning",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "concluded",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "priority",
                        type: "varchar"
                    },
                    {
                        name: "responsible",
                        type: "varchar"
                    },
                    {
                        name: "runtime",
                        type: "varchar"
                    },
                    {
                        name: "startExecution",
                        type: "date"
                    },
                    {
                        name: "status",
                        type: "varchar"
                    },
                    {
                        name: "relationWork",
                        type: "varchar"
                    },
                    {
                        name: "vehicle",
                        type: "varchar"
                    },
                    {
                        name: "operationWeekend",
                        type: "varchar"
                    },
                    {
                        name: "scheduleTomorrow",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("planning")
    }
}
