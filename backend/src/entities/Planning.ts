import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("planning")
class Planning {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    situation: string;

    @Column()
    description: string;

    @Column()
    priority: string;

    @Column()
    responsible: string;

    @Column()
    runtime: string;

    @CreateDateColumn()
    startExecution: Date;

    @Column()
    status: string;

    @Column()
    relationWork: string;

    @Column()
    vehicle: string;

    @Column()
    operationWeekend: string;

    @Column()
    scheduleTomorrow: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Planning }
