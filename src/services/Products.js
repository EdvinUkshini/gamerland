import http from "../http-common"; 

class Products {
  getAll(type,lth,gth) {
    return http.get(`/Product?type=${type}&lessThan=${lth}&greaterThan=${gth}`); 
  } 

  get(id) {
    return http.get(`/Product/${id}`);
  }
  
  theLatest(number) { 
    return http.get(`/Product/latestProducts/${number}`); 
  }

  create(data) {
    return http.post("/Product/", data);
  }

  update(id, data) {
    return http.put(`/Product/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Product/${id}`);
  }

  deleteAll() {
    return http.delete(`/Product`);
  }
  filterByManufacturer(type,manufacturer) {
    return http.get(`/Product?type=${type}&manufacturer=${manufacturer}`); 
  } 
}

export default new Products();