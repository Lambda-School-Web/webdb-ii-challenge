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
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error when attempting to add vehicle" });
  }
});

function validateID(req, res, next) {
  //validate id here
}

function validatePostCar(req, res, next) {
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
    res.status(400).json({
      message: "Please provide Vin, make, model and mileage of the vehicle"
    });
  } else if (typeof req.body.mileage !== "number") {
    console.log(typeof req.body.mileage);
    console.log(typeof req.body.make);
    res
      .status(400)
      .json({ message: "Mileage of the vehicle must be an integer" });
  } else {
    next();
  }
}

module.exports = router;
