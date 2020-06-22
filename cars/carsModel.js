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
    return db("cars").where({ id });
  }

  return db("cars");
}

function insert(car) {
  return db("cars")
    .insert(car)
    .then(([id]) => this.get(id));
}

function update(id, changes) {
  return db("cars")
    .where({ id })
    .update(changes)
    .then(count => (count ? this.get(id) : null));
}

function remove(id) {
  return db("cars")
    .where({ id })
    .del();
}
