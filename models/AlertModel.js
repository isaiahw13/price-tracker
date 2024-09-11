const db = require("../config/db");

const AlertModel = {
  //Add new target price alert
  add: async (product_id, target_price) => {
    const res = await db.query(
      "INSERT INTO alerts (product_id, target_price) VALUES ($1, $2) RETURNING *",
      [product_id, target_price],
    );
    return res.rows[0];
  },

  //get individual product's alert price
  getTargetPriceByProductId: async (product_id) => {
    const res = await db.query(
      "SELECT target_price FROM alerts WHERE product_id = $1",
      [product_id],
    );
    return res.rows;
  },

  //delete individual product's price alert(s)
  deleteByProductId: async (product_id) => {
    const res = await db.query(
      "DELETE FROM alerts WHERE product_id = $1 RETURNING *",
      [product_id],
    );
    return res.rows[0];
  },

  updateTargetPrice: async (target_price, product_id) => {
    const res = await db.query(
      "UPDATE alerts SET target_price = $1 WHERE product_id = $2 RETURNING *",
      [target_price, product_id],
    );
    return res.rows[0];
  },
};

module.exports = AlertModel;
