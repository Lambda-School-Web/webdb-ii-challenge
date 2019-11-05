exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: "1C4BJWCG8DL501255",
          make: "Jeep",
          model: "Wrangler",
          mileage: 55000,
          titleStatus: "clean",
          transmissionType: "automatic"
        },
        {
          vin: "2HKRM4H51CH631687",
          make: "Honda",
          model: "Cr V",
          mileage: 38690,
          titleStatus: "salvage",
          transmissionType: "automatic"
        },
        {
          vin: "3TMMU4FN8CM049190",
          make: "Toyota",
          model: "Tacoma",
          mileage: 60000,
          titleStatus: "clean",
          transmissionType: "automatic"
        },
        {
          vin: "3VWRA69M74M033915",
          make: "Volkswagen",
          model: "Jetta",
          mileage: 17500,
          titleStatus: "clean",
          transmissionType: "automatic"
        },
        {
          vin: "SAJWA0ES6DPS56028",
          make: "Jaguar",
          model: "XF",
          mileage: 25000,
          transmissionType: "automatic"
        },
        {
          vin: "1FTZX1722XKA76091",
          make: "Ford",
          model: "F 150",
          mileage: 45000,
          titleStatus: "clean",
          transmissionType: "automatic"
        },
        {
          vin: "1ZVBP8AM0D5265429",
          make: "Ford",
          model: "Mustang",
          mileage: 10000,
          titleStatus: "clean",
          transmissionType: "manual"
        },
        {
          vin: "5NPDH4AE0DH213924",
          make: "Hyundai",
          model: "Elantra",
          mileage: 14144,
          titleStatus: "clean"
        },
        {
          vin: "YV1SW61R021197119",
          make: "Volvo",
          model: "V70",
          mileage: 12400,
          titleStatus: "salvage",
          transmissionType: "automatic"
        },
        {
          vin: "JHMSZ742XDC128218",
          make: "Honda",
          model: "Accord",
          mileage: 21000,
          titleStatus: "clean",
          transmissionType: "manual"
        },
        {
          vin: "WAULF78K89N032914",
          make: "Audi",
          model: "A4",
          mileage: 21241,
          titleStatus: "clean",
          transmissionType: "automatic"
        }
      ]);
    });
};
