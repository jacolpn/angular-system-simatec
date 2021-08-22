import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { PlanningRepositories } from "../repositories/PlanningRepositories";

class ListPlanningService {
    async execute() {
        const planningRepositories = getCustomRepository(PlanningRepositories);
        const planning = await planningRepositories.find();

        return classToPlain(planning);
    }
}

export { ListPlanningService }
