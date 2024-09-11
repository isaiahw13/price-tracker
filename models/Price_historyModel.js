const db = require("../config/db");

const Price_historyModel = {
  //get the entire price history of a product by it's ID'
  getByProductId: async (product_id) => {
    const res = await db.query("SELECT price_history WHERE product_id = $1", [
      product_id,
    ]);
    return res.rows;
  },

  //add current price entry
  add: async (product_id, price) => {
    const res = await db.query(
      "INSERT INTO price_history (product_id, price) VALUES ($1, $2) RETURNING *",
      [product_id, price],
    );
    return res.rows[0];
  },

  //Delete all of the price history of a product
  deleteByProductId: async (product_id) => {
    const res = await db.query(
      "DELETE FROM price_history WHERE product_id = $1",
      [product_id],
    );
  },
};
