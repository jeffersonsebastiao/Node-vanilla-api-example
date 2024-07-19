import data from "../../data/index.js";
import { randomUUID } from "node:crypto";

export class ProductsModel {
  findAll() {
    return new Promise((resolve, reject) => {
      const products = JSON.parse(data);
      resolve(products);
    });
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      const product = JSON.parse(data).find((product) => product.id === id);
      resolve(product);
    });
  }

  create({ name, description }) {
    return new Promise((resolve, reject) => {
      const productList = JSON.parse(data);
      productList.push({
        id: randomUUID(),
        name,
        description,
      });

      resolve(productList);
    });
  }

  update({ id, name, description }) {
    return new Promise((resolve, reject) => {
      const productsList = JSON.parse(data);
      const objIndex = productsList.findIndex((obj) => obj.id == id);
      productsList[objIndex].name = name;
      productsList[objIndex].description = description;

      resolve(productsList[objIndex]);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const newProductList = JSON.parse(data).filter(
        (product) => product.id !== id
      );
      resolve(newProductList);
    });
  }
}
