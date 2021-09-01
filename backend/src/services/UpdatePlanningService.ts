import { getCustomRepository } from "typeorm";
import { Planning } from "../entities/Planning";
import { PlanningRepositories } from "../repositories/PlanningRepositories";

interface IUpdateSituation {
    id: string;
    situation: string;    
}

class UpdatePlanningService {
    async execute(response) {
        const {situation, id }: IUpdateSituation = response;        
        const planningRepositories = getCustomRepository(PlanningRepositories);

        var planning: Planning = await planningRepositories.findOne({id : id}).then((planning) => planning);

        planning.situation = situation == 'Concluido' ? 'Em andamento' : 'Concluido';
        planningRepositories.save(planning);
    }
}

export { UpdatePlanningService };
