const { test, expect } = require("@playwright/test");

const BASE_URL = "https://jsonplaceholder.typicode.com";

test.describe("GET requests", () => {
  test("gets all posts", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);

    // Status check
    expect(response.status()).toBe(200);

    // Parse the body
    const posts = await response.json();

    // It's an array with more than 50 items
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(50);
  });

  test("gets a single post", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);

    expect(response.status()).toBe(200);

    const post = await response.json();

    // Check fields and values
    expect(post).toHaveProperty("id", 1);
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("userId");
    expect(typeof post.id).toBe("number");
  });
});

test.describe("POST requests", () => {
  test("creates a new post", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/posts`, {
      data: {
        title: "Abdullah's Test Post",
        body: "Created via Playwright API test",
        userId: 1,
      },
    });

    // POST returns 201
    expect(response.status()).toBe(201);

    const newPost = await response.json();

    // Response contains what we sent
    expect(newPost.title).toBe("Abdullah's Test Post");
    expect(newPost.userId).toBe(1);
    expect(newPost).toHaveProperty("id");
  });
});

test.describe("PUT requests", () => {
  test("updates a post", async ({ request }) => {
    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: {
        id: 1,
        title: "Updated Title",
        body: "Updated body",
        userId: 1,
      },
    });

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.title).toBe("Updated Title");
  });
});

test.describe("DELETE requests", () => {
  test("deletes a post", async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);

    expect(response.status()).toBe(200);
  });
});


// Challenge

test.describe("Error handling", () => {
  test("returns 404 for non-existent post", async ({ request }) => {
     const response = await request.get(`${BASE_URL}/posts/9999`);

    expect(response.status()).toBe(404);

  });
});

