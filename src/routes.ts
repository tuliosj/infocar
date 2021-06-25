import { Router } from "express";
import { VehicleController } from "./controllers/VehicleController";
import { createVehicleSchema } from "./schemas/Vehicles";
import { validateVehicleSchema } from "./middlewares/Vehicles";

const router = Router();

const vehicleController = new VehicleController();

router.post(
  "/vehicles",
  createVehicleSchema,
  validateVehicleSchema,
  vehicleController.create
);
router.get("/vehicles/:renavam", vehicleController.read);

export { router };
