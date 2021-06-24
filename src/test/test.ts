import request from "supertest";
import createConnection from "../database";
import assert from "assert";
import { app } from "../app";

describe("Vehicles", () => {
  before(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  describe("Create", () => {
    it("Should be able to create a new vehicle", async () => {
      const response = await request(app).post("/vehicles").send({
        placa: "KBT-5093",
        chassi: "4F3 8kYFA3 a6 Dw3599",
        renavam: "0961378352-6",
        modelo: "OUTLANDER 2.0 16V 160cv Aut.",
        marca: "Mitsubishi",
        ano: 2022,
      });
      assert.strictEqual(response.status, 201);
    });

    it("Should not be able to create a vehicle with an existing renavam", async () => {
      const response = await request(app).post("/vehicles").send({
        placa: "KBT-5093",
        chassi: "4F3 8kYFA3 a6 Dw3599",
        renavam: "0961378352-6",
        modelo: "OUTLANDER 2.0 16V 160cv Aut.",
        marca: "Mitsubishi",
        ano: 2022,
      });
      assert.strictEqual(response.status, 400);
    });
  });
});
