export class ProductsController {
  constructor(model) {
    this.repository = model;
  }

  /**
   * @desc Get all products available
   * @route GET /products
   */
  async getProducts(req, res) {
    try {
      const products = await this.repository.findAll();

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(products));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end();
    }
  }

  /**
   * @desc Get a specific product
   * @route GET /products/:id
   */
  async getProduct(req, res, id) {
    try {
      const product = await this.repository.findOne(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(product));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end();
    }
  }

  /**
   * @desc  Create a new product
   * @route POST /products
   */
  async createProduct(req, res) {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const { name, description } = JSON.parse(body);
        const newProduct = await this.repository.create({ name, description });

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newProduct));
      });
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end();
    }
  }

  /**
   * @desc Update a available product
   * @route PATCH /products/:id
   */
  async updateProduct(req, res, id) {
    try {
      const product = await this.repository.findOne(id);

      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Product not found" }));
      } else {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", async () => {
          const { name, description } = JSON.parse(body);
          const updatedProduct = await this.repository.update({
            id,
            name,
            description,
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(updatedProduct));
        });
      }
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end();
    }
  }

  async deleteProduct(req, res, id) {
    try {
      const newListProducts = await this.repository.delete(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newListProducts));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end();
    }
  }
}
