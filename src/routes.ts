import { Router } from "express";
import { VehicleController } from "./controllers/VehicleController";

const router = Router();

const vehicleController = new VehicleController();

router.post("/vehicles", vehicleController.create);

export { router };
