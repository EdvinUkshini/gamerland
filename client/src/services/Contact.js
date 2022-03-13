import http from "../http-common";

class Contact {
  create(data) {
    return http.post("/contact", data);
  }
}

export default new Contact();