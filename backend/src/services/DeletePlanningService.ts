import { getCustomRepository } from "typeorm";
import { PlanningRepositories } from "../repositories/PlanningRepositories";

interface IDeletePlanning {
    id: string;
}

class DeletePlanningService {
    async execute(response) {
        const { id }: IDeletePlanning = response;

        const planningRepositories = getCustomRepository(PlanningRepositories);

        return planningRepositories.delete(id);
    }
}

export { DeletePlanningService };
