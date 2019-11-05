const db = require("../data/dbConfig");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(id) {
  //db stuff here
  if (id) {
    return db("cars").where("id", id);
  }

  return db("cars");
}

function insert(car) {
  return db("cars")
    .insert(car)
    .then(([id]) => this.get(id));
}

function update(id, changes) {
  //db stuff here
}

function remove(id) {
  //db stuff here
}
