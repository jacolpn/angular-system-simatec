import { EntityRepository, Repository } from "typeorm";
import { Planning } from "../entities/Planning";

@EntityRepository(Planning)
class PlanningRepositories extends Repository<Planning> { }

export { PlanningRepositories }
