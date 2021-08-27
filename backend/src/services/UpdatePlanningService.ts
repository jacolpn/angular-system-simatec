import { getCustomRepository } from "typeorm";
import { PlanningRepositories } from "../repositories/PlanningRepositories";

interface IUpdateSituation {
    id: string;
    situation: string;    
}

class UpdatePlanningService {
    async execute(response) {
        const {situation, id }: IUpdateSituation = response;

        const planningRepositories = getCustomRepository(PlanningRepositories);

        await planningRepositories.findOne({id : id}).then((planning) => {
            planning.situation = situation;
            planningRepositories.save(planning);
        });
    }
}

export { UpdatePlanningService };
