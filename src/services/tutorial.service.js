import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/tutoriais");
  }

  get(id) {
    return http.get(`/tutoriais/${id}`);
  }

  create(data) {
    return http.post("/tutoriais", data);
  }

  update(id, data) {
    return http.put(`/tutoriais/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutoriais/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutoriais`);
  }

  findByTitulo(titulo) {
    return http.get(`/tutoriais?titulo=${titulo}`);
  }
}

export default new TutorialDataService();