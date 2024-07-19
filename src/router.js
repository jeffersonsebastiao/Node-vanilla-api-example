import { ProductsController } from "./components/products/ProductsController.js";
import { ProductsModel } from "./components/products/ProductsModel.js";

const productRepository = new ProductsModel();
const productsController = new ProductsController(productRepository);

export function router(req, res) {
  if (req.url === "/products" && req.method === "GET") {
    productsController.getProducts(req, res);
  }

  if (req.url.match(/\/products\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[2];
    productsController.getProduct(req, res, id);
  }

  if (req.url === "/products" && req.method === "POST") {
    productsController.createProduct(req, res);
  }

  if (req.url.match(/\/products\/\w+/) && req.method === "PATCH") {
    const id = req.url.split("/")[2];
    productsController.updateProduct(req, res, id);
  }

  if (req.url.match(/\/products\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    productsController.deleteProduct(req, res, id);
  }
}
