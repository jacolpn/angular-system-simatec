import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { PlanningRepositories } from "../repositories/PlanningRepositories";

class ListPlanningService {
    async execute() {
        const planningRepositories = getCustomRepository(PlanningRepositories);
        var planning = await planningRepositories.find({
            order: {
                created_at: "DESC",
            },
        });
        return classToPlain(planning);
    }
}

export { ListPlanningService };
