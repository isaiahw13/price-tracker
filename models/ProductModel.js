const db = require("../config/db");

const ProductModel = {
  //get all products from the db
  getAll: async () => {
    const res = await db.query("SELECT * FROM products");
    return response.rows;
  },

  //add new product to the database (parameterized query)
  add: async (name, url, current_price) => {
    const res = await d.query(
      "INSERT INTO products (name, url, current_price) VALUES ($1, $2, $3) RETURNING *",
      [name, url, current_price],
    );
    return res.rows[0];
  },

  //update the current price of an existing product
  updatePrice: async (new_price, url) => {
    const res = await db.query(
      "UPDATE products SET current_price = $1, last_checked = CURRENT_TIMESTAMP WHERE url = $2 RETURNING *",
      [new_price, url],
    );
    return res.rows[0];
  },

  //delete product by it's url
  delete: async (url) => {
    res = await db.query("DELETE FROM products WHERE url = $1 RETURNING *", [
      url,
    ]);
    return res.rows[0];
  },
};

module.exports = ProductModel;
