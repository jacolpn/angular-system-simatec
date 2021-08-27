import { Request, Response,  } from "express";
import { CreatePlanningService } from "../services/CreatePlanningService";
import { DeletePlanningService } from "../services/DeletePlanningService";
import { ListPlanningService } from "../services/ListPlanningService";import { UpdatePlanningService } from "../services/UpdatePlanningService";
;

class PlanningController {
    async list(req: Request, res: Response) {
        const listPlanningService = new ListPlanningService();
        const planning = await listPlanningService.execute();

        return res.json(planning);
    }

    async create(req: Request, res: Response) {
        const response = req.body;       
        const createPlanningService = new CreatePlanningService();
        const planning = await createPlanningService.execute(response);

        return res.json(planning);
    }

    async update(req: Request, res: Response) {
        const response = req.body;       
        const updatePlanningService = new UpdatePlanningService();
        const planning = await updatePlanningService.execute(response);

        return res.json(planning);
    }

    async delete(req: Request, res: Response) {
        const response = req.params;       
        const deletePlanningService = new DeletePlanningService();
        const planning = await deletePlanningService.execute(response);

        return res.json(planning);
    }
}

export { PlanningController }