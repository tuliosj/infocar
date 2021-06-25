import { Router } from "express";
import { VehicleController } from "./controllers/VehicleController";
import { VehicleSchema } from "./schemas/Vehicles";
import { validateVehicleSchema } from "./middlewares/Vehicles";

const router = Router();

const vehicleController = new VehicleController();

router.post(
  "/vehicles",
  VehicleSchema,
  validateVehicleSchema,
  vehicleController.create
);

export { router };
