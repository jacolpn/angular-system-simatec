import { Router } from "express";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreatePlanningController } from "./controllers/CreatePlanningController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListPlanningController } from "./controllers/ListPlanningController";
import { ListUserController } from "./controllers/ListUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();
const createUserController = new CreateUserController();
const autenthicateUserController = new AuthenticateUserController();
const listUserController = new ListUserController();
const createPlanningController = new CreatePlanningController();
const listPlanningController = new ListPlanningController();

router.post("/users", createUserController.handle);
router.post("/login", autenthicateUserController.handle);
router.post("/planning", createPlanningController.handle);

router.get('/users', listUserController.handle);
router.get("/planning", listPlanningController.handle);

export { router };
