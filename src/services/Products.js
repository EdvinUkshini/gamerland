import http from "../http-common"; 

class Products {
  getAll(lth,gth) {
    return http.get(`/Products?lessThan=${lth}&greaterThan=${gth}`); 
  } 

  get(id) {
    return http.get(`/Products/${id}`);
  }
  
  theLatest(number) { 
    return http.get(`/Products?theLatest=${number}&lessThan=0&greaterThan=10000`); 
  }

  create(data) {
    return http.post("/Products/", data);
  }

  update(id, data) {
    return http.put(`/Products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Products/${id}`);
  }

  deleteAll() {
    return http.delete(`/Products`);
  }
}

export default new Products();