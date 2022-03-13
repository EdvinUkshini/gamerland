import http from "../http-common";

class UserProfile {
  getMyInformations(userId) {
    return http.get("/users/details/"+userId);
  }
  addShipping(data) {
    return http.post("/shipping", data);
  }
  getMyShipping(userId) {
    return http.get("/shipping/"+userId);
  }
  deleteMyShipping(userId){
    return http.delete("/shipping/"+userId);
  }
}

export default new UserProfile();