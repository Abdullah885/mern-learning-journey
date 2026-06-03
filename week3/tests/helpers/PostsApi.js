class PostsApi {
  constructor(request) {
    this.request = request;
    this.baseUrl = "https://jsonplaceholder.typicode.com";
  }

  // GET all posts
  async getAllPosts() {
    return await this.request.get(`${this.baseUrl}/posts`);
  }

  // GET single post
  async getPost(id) {
    return await this.request.get(`${this.baseUrl}/posts/${id}`);
  }

  // CREATE a post
  async createPost(data) {
    return await this.request.post(`${this.baseUrl}/posts`, { data });
  }

  // UPDATE a post
  async updatePost(id, data) {
    return await this.request.put(`${this.baseUrl}/posts/${id}`, { data });
  }

  // DELETE a post
  async deletePost(id) {
    return await this.request.delete(`${this.baseUrl}/posts/${id}`);
  }
}

module.exports = { PostsApi };