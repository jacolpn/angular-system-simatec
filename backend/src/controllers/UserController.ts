import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListUserService } from "../services/ListUserService";

class  UserController {
    async list(req: Request, res: Response) {
        const listUserService = new ListUserService();
        const users = await listUserService.execute();

        return res.json(users);
    }

    async create(req: Request, res: Response) {
        const response = req.body;        
        const createUserService = new CreateUserService();
        const user = await createUserService.execute(response);

        return res.json(user);
    }
}

export { UserController }