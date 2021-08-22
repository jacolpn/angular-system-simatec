import { Request, Response } from "express";
import { CreatePlanningService } from "../services/CreatePlanningService";

class CreatePlanningController {
    async handle(req: Request, res: Response) {
        const {
            concluded,
            description,
            priority,
            responsible,
            runtime,
            startExecution,
            status,
            relationWork,
            vehicle,
            operationWeekend,
            scheduleTomorrow
        } = req.body;
        const createPlanningService = new CreatePlanningService();
        const planning = await createPlanningService.execute({
            concluded,
            description,
            priority,
            responsible,
            runtime,
            startExecution,
            status,
            relationWork,
            vehicle,
            operationWeekend,
            scheduleTomorrow
        });

        return res.json(planning);
    }
}

export { CreatePlanningController };
