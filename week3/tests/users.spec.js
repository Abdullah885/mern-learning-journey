const { test, expect } = require("@playwright/test");
const { UsersApi } = require("./helpers/UsersApi");

let usersApi;

test.beforeEach(async ({ request }) => {
  usersApi = new UsersApi(request);
});

test.describe("Users API — Read", () => {
  // Challenge 1
  test("gets all users", async () => {
    const response = await usersApi.getAllUsers();
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBe(10);
  });

  // Challenge 2
  test("gets single user", async () => {
    const response = await usersApi.getUser(1);   // ✅ instance, not class
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe("Leanne Graham");      // ✅ name not username
    expect(user).toHaveProperty("email");
  });

  // Challenge 3
  test("gets city and company name of user", async () => {
    const response = await usersApi.getUser(1);
    const user = await response.json();
    expect(user.address.city).toBe("Gwenborough");
    expect(user.company.name).toBe("Romaguera-Crona");
  });

  // Challenge 5
  test("gets todos of user 1", async () => {
    const response = await usersApi.userTodos(1);  // ✅ use helper
    expect(response.status()).toBe(200);
    const todos = await response.json();
    expect(Array.isArray(todos)).toBeTruthy();

    for (const todo of todos) {                    // ✅ check each item
      expect(todo).toHaveProperty("title");
      expect(todo).toHaveProperty("completed");
    }
  });
});

// Challenge 4
test.describe("Data-driven — users", () => {
  const userIds = [1, 2, 3, 4, 5];

  for (const userId of userIds) {
    test(`user ${userId} has valid email`, async ({ request }) => {
      const usersApi = new UsersApi(request);
      const response = await usersApi.getUser(userId);
      expect(response.status()).toBe(200);
      const user = await response.json();           // ✅ define user
      expect(user.email).toContain("@");
    });
  }
});