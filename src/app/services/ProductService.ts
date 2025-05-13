import { serverApi } from "../../lib/config";

class ProductSerivce {
  private readonly path;

  constructor() {
    this.path = serverApi;
  }

  public getProducts() {
    console.log("products");
  }
}

export default ProductSerivce;
