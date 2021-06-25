import { body } from "express-validator";

const createVehicleSchema = [
  body("placa")
    .notEmpty()
    .isString()
    .isLength({ min: 7, max: 8 })
    .withMessage("the plate must be a string between 7 and 8 characters"),
  body("chassi")
    .notEmpty()
    .isString()
    .isLength({ min: 17, max: 17 })
    .withMessage("the chassi must be a string with 17 characters"),
  body("renavam")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 9, max: 11 })
    .withMessage("the renavam must be a string between 9 and 11 characters"),
  body("modelo")
    .notEmpty()
    .isString()
    .withMessage("the model must be a string"),
  body("marca")
    .notEmpty()
    .isString()
    .withMessage("the manufacturer must be a string"),
  body("ano")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 4, max: 4 })
    .matches(/^(19\d\d|20\d\d)$/)
    .withMessage("the year must be a number between 1900-2000"),
];

export { createVehicleSchema };
