class UsersApi {
  constructor(request) {
    this.request = request;
    this.baseUrl = "https://jsonplaceholder.typicode.com";
  }
  // GET all userss
  async getAllUsers(){
    return await this.request.get(`${this.baseUrl}/users`);
  }

  // Get sing user

  async getUser(id){
  return await this.request.get(`${this.baseUrl}/users/${id}`);
}

  async userTodos(id){
    return await this.request.get(`${this.baseUrl}/users/${id}/todos`)
  }

}
  module.exports = { UsersApi };