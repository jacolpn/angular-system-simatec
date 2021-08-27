import { Router } from "express";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { PlanningController } from "./controllers/PlanningController";
import { UserController } from "./controllers/UserController";

const router = Router();

const autenthicateUserController = new AuthenticateUserController();
const userController = new UserController();
const planningControll = new PlanningController();

router.post("/users", userController.create);
router.post("/login", autenthicateUserController.handle);
router.post("/planning", planningControll.create);

router.get("/users", userController.list);
router.get("/planning", planningControll.list);

router.put("/planning", planningControll.update);

router.delete("/planning/:id", planningControll.delete);

export { router };
