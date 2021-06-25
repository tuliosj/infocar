import request from "supertest";
import createConnection from "../../src/database";
import assert from "assert";
import { app } from "../../src/app";

describe("Vehicles", () => {
  before(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  describe("Create", () => {
    it("Should be able to create a new vehicle with the correct parameters", async () => {
      const response = await request(app).post("/vehicles").send({
        placa: "KBT-5093",
        chassi: "4F38kYFA3a6Dw3599",
        renavam: "09613783526",
        modelo: "OUTLANDER 2.0 16V 160cv Aut.",
        marca: "Mitsubishi",
        ano: 2022,
      });
      assert.strictEqual(response.status, 201);
    });

    it("Should not be able to create a new vehicle with the wrong parameters", async () => {
      const response = await request(app).post("/vehicles").send({
        placa: "KBT-5093",
        chassi: "4F38kYFA3a6Dw3599",
        renavam: "01321479826",
        modelo: "OUTLANDER 2.0 16V 160cv Aut.",
        ano: 2022,
      });
      assert.strictEqual(response.status, 400);
    });

    it("Should not be able to create a vehicle with an existing renavam", async () => {
      const response = await request(app).post("/vehicles").send({
        placa: "MWU-8907",
        chassi: "1FtAAKrBbg7y64492",
        renavam: "82895498795",
        modelo: "ONIX  Lollapalooza 1.0 F.Power 5p Mec.",
        marca: "GM - Chevrolet",
        ano: 2014,
      });
      assert.strictEqual(response.status, 201);

      const duplicate = await request(app).post("/vehicles").send({
        placa: "MWU-8907",
        chassi: "1FtAAKrBbg7y64492",
        renavam: "82895498795",
        modelo: "ONIX  Lollapalooza 1.0 F.Power 5p Mec.",
        marca: "GM - Chevrolet",
        ano: 2014,
      });
      assert.strictEqual(duplicate.status, 400);
    });
  });

  describe("Read", () => {
    it("Should be able to read a vehicle's attributes based on the renavam", async () => {
      const response = await request(app).get("/vehicles/82895498795");
      assert.strictEqual(response.status, 200);
    });

    it("Should return 400 when the renavam doesn't exist in the database", async () => {
      const response = await request(app).get("/vehicles/d gf");
      assert.strictEqual(response.status, 400);
    });
  });

  describe("Update", () => {
    it("Should be able to update an existing vehicle", async () => {
      const response = await request(app).put("/vehicles/82895498795").send({
        placa: "OPA-9001",
        chassi: "1FtAAKrBbg7y64492",
        renavam: "82895498120",
        modelo: "ONIX  Lollapalooza 1.0 F.Power 5p Mec.",
        marca: "GM - Chevrolet",
        ano: 2014,
      });
      assert.strictEqual(response.status, 200);
    });

    it("Should not be able to update a renavam which doesn't exist", async () => {
      const response = await request(app).put("/vehicles/d gf").send({
        placa: "MWU-8907",
        chassi: "1FtAAKrBbg7y64492",
        renavam: "82895498795",
        modelo: "ONIX  Lollapalooza 1.0 F.Power 5p Mec.",
        marca: "GM - Chevrolet",
        ano: 2014,
      });
      assert.strictEqual(response.status, 400);
    });

    it("Should be able to update an existing vehicle with the wrong parameters", async () => {
      const response = await request(app).put("/vehicles/82895498120").send({
        placa: "MWU-8907",
        chassi: "1FtAAKrBbg7y6asdasdacxvxcvxcvxcv4492",
        renavam: "82895498795",
        modelo: "ONIX  Lollapalooza 1.0 F.Power 5p Mec.",
        marca: "GM - Chevrolet",
        ano: 2014,
      });
      assert.strictEqual(response.status, 400);
    });

    it("Should be able to update an existing vehicle with a new renavam", async () => {
      const response = await request(app).put("/vehicles/82895498120").send({
        placa: "UAU-9001",
        chassi: "1FtAAKrBbg7y64492",
        renavam: "82895498120",
        modelo: "ONIX  Lollapalooza 1.0 F.Power 5p Mec.",
        marca: "GM - Chevrolet",
        ano: 2014,
      });
      assert.strictEqual(response.status, 200);
    });
  });

  describe("Delete", () => {
    it("Should be able to delete a vehicle based on the renavam", async () => {
      const response = await request(app).delete("/vehicles/09613783526");
      assert.strictEqual(response.status, 200);
    });

    it("Should return 400 when the renavam doesn't exist in the database", async () => {
      const response = await request(app).delete("/vehicles/d gf");
      assert.strictEqual(response.status, 400);
    });
  });
});
