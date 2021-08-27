import { getCustomRepository } from "typeorm";
import { PlanningRepositories } from "../repositories/PlanningRepositories";

interface IAuthenticateRequest {
    situation: string;
    description: string;
    priority: string;
    responsible: string;
    runtime: string;
    startExecution: Date;
    status: string;
    relationWork: string;
    vehicle: string;
    operationWeekend: string;
    scheduleTomorrow: string;
}

class CreatePlanningService {
    async execute(response) {
        const {
            situation,
            description,
            priority,
            responsible,
            runtime,
            startExecution,
            status,
            relationWork,
            vehicle,
            operationWeekend,
            scheduleTomorrow,
        }: IAuthenticateRequest = response;

        const planningRepositories = getCustomRepository(PlanningRepositories);

        const planning = planningRepositories.create({
            situation,
            description,
            priority,
            responsible,
            runtime,
            startExecution,
            status,
            relationWork,
            vehicle,
            operationWeekend,
            scheduleTomorrow,
        });

        await planningRepositories.save(planning);

        return planning;
    }
}

export { CreatePlanningService };
