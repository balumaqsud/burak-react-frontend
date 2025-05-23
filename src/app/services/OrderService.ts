import axios from "axios";
import { serverApi } from "../../lib/config";
import { Order, OrderInquiry, OrderItemInput } from "../../lib/types/order";
import { CardItem } from "../../lib/types/search";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createOrder(input: CardItem[]): Promise<Order> {
    try {
      const orderItems: OrderItemInput[] = input.map((item: CardItem) => {
        return {
          itemQuantity: item.quantity,
          itemPrice: item.price,
          productId: item._id,
        };
      });
      const url = this.path + "/order/create";
      const result = await axios.post(url, orderItems, {
        withCredentials: true,
      });
      console.log("createOrder", result);
      return result.data;
    } catch (error) {
      console.log("createOrder error", error);
      throw error;
    }
  }
  public async getOrders(input: OrderInquiry): Promise<Order[]> {
    try {
      const url = this.path + "/order/all";
      const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;

      const result = await axios.get(url + query, { withCredentials: true });
      console.log("getOrders", result);
      return result.data;
    } catch (error) {
      console.log("getOrders error", error);
      throw error;
    }
  }
}

export default OrderService;
