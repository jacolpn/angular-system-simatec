import { Request, Response } from "express";
import { ListPlanningService } from "../services/ListPlanningService";;

class ListPlanningController {
    async handle(req: Request, res: Response) {
        const listPlanningService = new ListPlanningService();
        const planning = await listPlanningService.execute();

        return res.json(planning);
    }
}

export { ListPlanningController }