const { test, expect } = require("@playwright/test");
const { PostsApi } = require("./helpers/PostsApi");

let postsApi;

test.beforeEach(async ({ request }) => {
  postsApi = new PostsApi(request);
});

test.describe("Posts API — Read", () => {
  test("gets all posts", async () => {
    const response = await postsApi.getAllPosts();
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(50);
  });

  test("gets a single post", async () => {
    const response = await postsApi.getPost(1);
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post.id).toBe(1);
  });

  test("returns 404 for missing post", async () => {
    const response = await postsApi.getPost(9999);
    expect(response.status()).toBe(404);
  });
});

test.describe("Posts API — Create", () => {
  test("creates a post", async () => {
    const response = await postsApi.createPost({
      title: "New Post",
      body: "Content here",
      userId: 1,
    });
    expect(response.status()).toBe(201);

    const post = await response.json();
    expect(post.title).toBe("New Post");
  });
});

test.describe("Posts API — Update", () => {
  test("updates a post", async () => {
    const response = await postsApi.updatePost(1, {
      title: "Updated",
      body: "Updated content",
      userId: 1,
    });
    expect(response.status()).toBe(200);
  });
});

test.describe("Posts API — Delete", () => {
  test("deletes a post", async () => {
    const response = await postsApi.deletePost(1);
    expect(response.status()).toBe(200);
  });
});


test.describe("Data-driven — multiple posts exist", () => {
  // Array of test data
  const postIds = [1, 2, 3, 4, 5];

  // Loop creates a test for each id
  for (const id of postIds) {
    test(`post ${id} exists and has correct id`, async ({ request }) => {
      const postsApi = new PostsApi(request);
      const response = await postsApi.getPost(id);

      expect(response.status()).toBe(200);

      const post = await response.json();
      expect(post.id).toBe(id);
    });
  }
});