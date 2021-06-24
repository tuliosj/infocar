import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Vehicle } from "../models/Vehicle";

class VehicleController {
  async create(request: Request, response: Response) {
    const { placa, chassi, renavam, modelo, marca, ano } = request.body;

    const vehiclesRepository = getRepository(Vehicle);

    const vehicle = vehiclesRepository.create({
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
    });

    await vehiclesRepository.save(vehicle);

    return response.json(vehicle);
  }
}

export { VehicleController };
