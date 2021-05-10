import http from "../http-common";

class MyOrders {
  getMyOrders(userId) {
    return http.get("/order/"+userId);
  }
  deleteOrder(id) {
    return http.delete("/order/"+id);
  }
  getMyShipping(userId) {
    return http.get("/shipping/"+userId);
  }
}

export default new MyOrders();