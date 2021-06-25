import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { VehiclesRepository } from "../repositores/VehiclesRepository";

class VehicleController {
  async create(request: Request, response: Response) {
    const { placa, chassi, renavam, modelo, marca, ano } = request.body;

    const vehiclesRepository = getCustomRepository(VehiclesRepository);

    const vehicleAlreadyExists = await vehiclesRepository.findOne({ renavam });

    if (vehicleAlreadyExists) {
      return response.status(400).json({ error: "Vehicle already exists!" });
    }

    const vehicle = vehiclesRepository.create({
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
    });

    await vehiclesRepository.save(vehicle);

    return response.status(201).json(vehicle);
  }

  async read(request: Request, response: Response) {
    const { renavam } = request.params;

    const vehiclesRepository = getCustomRepository(VehiclesRepository);

    const vehicle = await vehiclesRepository.findOne({
      renavam,
    });

    if (vehicle) {
      return response.status(200).json(vehicle);
    } else {
      return response.status(400).json({ error: "Vehicle doesn't exist!" });
    }
  }

  async update(request: Request, response: Response) {
    const currentRenavam = request.params.renavam;

    const { placa, chassi, renavam, modelo, marca, ano } = request.body;

    const vehiclesRepository = getCustomRepository(VehiclesRepository);

    const currentVehicle = await vehiclesRepository.findOne({
      renavam: currentRenavam,
    });

    if (!currentVehicle) {
      return response.status(400).json({ error: "Vehicle doesn't exist!" });
    }

    const updatedVehicle = {
      placa: placa || currentVehicle.placa,
      chassi: chassi || currentVehicle.chassi,
      renavam: renavam || currentVehicle.renavam,
      modelo: modelo || currentVehicle.modelo,
      marca: marca || currentVehicle.marca,
      ano: ano || currentVehicle.ano,
    };

    await vehiclesRepository.update(currentVehicle.id, updatedVehicle);

    return response.status(200).json(updatedVehicle);
  }

  async delete(request: Request, response: Response) {
    const { renavam } = request.params;

    const vehiclesRepository = getCustomRepository(VehiclesRepository);

    const vehicle = await vehiclesRepository.findOne({
      renavam,
    });

    if (vehicle) {
      const success = await vehiclesRepository.delete(vehicle.id);

      const stillExists = await vehiclesRepository.findOne({
        renavam,
      });
      if (stillExists) {
        return response
          .status(400)
          .json({ error: "Unknown error while deleting" });
      }
      return response.status(200).json({ response: "Success" });
    } else {
      return response.status(400).json({ error: "Vehicle doesn't exist!" });
    }
  }
}

export { VehicleController };
