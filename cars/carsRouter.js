const router = require("express").Router();
const db = require("./carsModel");

router.get("/", async (req, res) => {
  try {
    const cars = await db.get();

    res.status(200).json(cars);
  } catch {
    res.status(500).json({
      error: "Internal server error when attempting to fetch vehicles."
    });
  }
});

router.post("/", validatePostCar, async (req, res) => {
  let carInfo = {
    vin: req.body.vin,
    make: req.body.make,
    model: req.body.model,
    mileage: req.body.mileage
  };

  if (req.body.transmissionType) {
    carInfo = { ...carInfo, transmissionType: req.body.transmissionType };
  }

  if (req.body.titleStatus) {
    carInfo = { ...carInfo, titleStatus: req.body.titleStatus };
  }

  try {
    const car = await db.insert(carInfo);

    res.status(201).json(car);
  } catch {
    res
      .status(500)
      .json({ error: "Internal server error when attempting to add vehicle" });
  }
});

router.get("/:id", validateID, (req, res) => {
  res.status(200).json(req.car);
});

router.put("/:id", validateID, validatePutCar, async (req, res) => {
  let {
    vin = null,
    make = null,
    model = null,
    mileage = null,
    titleStatus = null,
    transmissionType = null
  } = req.body;

  let changes = {};

  if (vin) changes = { ...changes, vin };
  if (make) changes = { ...changes, make };
  if (model) changes = { ...changes, model };
  if (mileage) changes = { ...changes, mileage };
  if (titleStatus) changes = { ...changes, titleStatus };
  if (transmissionType) changes = { ...changes, transmissionType };

  try {
    const car = await db.update(req.params.id, changes);

    car ? res.status(202).json(car) : null;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Internal server error when attempting to update the vehicle with that ID"
    });
  }
});

router.delete("/:id", validateID, async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);

    deleted
      ? res.status(202).json({ message: "Car with that ID was deleted" })
      : null;
  } catch {
    res.status(500).json({
      error:
        "Internal server error when attempting to delete the vehicle with that ID"
    });
  }
});

async function validateID(req, res, next) {
  try {
    const car = await db.get(req.params.id);
    req.car = car;
    car.length > 0
      ? next()
      : res
          .status(404)
          .json({ message: "Couldn't find the vehicle with that ID" });
  } catch {
    res.status(500).json({
      error:
        "Internal server error when attempting to find the vehicle with that ID"
    });
  }
}

function validatePostCar(req, res, next) {
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
    res.status(400).json({
      message: "Please provide Vin, make, model and mileage of the vehicle"
    });
  } else if (typeof req.body.mileage !== "number") {
    res
      .status(400)
      .json({ message: "Mileage of the vehicle must be an integer" });
  } else {
    next();
  }
}

function validatePutCar(req, res, next) {
  if (
    !req.body.vin &&
    !req.body.make &&
    !req.body.model &&
    !req.body.mileage &&
    !req.body.titleStatus &&
    !req.body.transmissionType
  ) {
    res.status(400).json({
      message:
        "Please provide vin, make, model, mileage, titleStatus, or transmissionType of the vehicle"
    });
  } else if (req.body.mileage && typeof req.body.mileage !== "number") {
    res
      .status(400)
      .json({ message: "Mileage of the vehicle must be an integer" });
  } else {
    next();
  }
}

module.exports = router;
