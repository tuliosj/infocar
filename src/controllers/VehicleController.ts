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
}

export { VehicleController };
