const { test, expect } = require("./fixtures"); // fixture replaces beforeEach
const { TodoPage } = require("./pages/TodoPage");

test.beforeAll(async () => {
  // Runs once before entire suite — good for logging, server setup
  console.log("Suite started — TodoMVC test run beginning");
});

test.afterAll(async () => {
  // Runs once after entire suite — good for cleanup, closing connections
  console.log("🏁 Suite complete — all tests finished");
});

test.afterEach(async ({ page }) => {
  // Runs after every test — good for debugging failures
  console.log("Test done — current URL:", page.url());
});

// ── Adding todos ───────────────────────────────────────────────────
test.describe("Adding todos", () => {
  test("adds a single todo", async ({ todoPage }) => {
    await todoPage.addTodo("Buy groceries");
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText("Buy groceries");
  });

  test("adds multiple todos in order", async ({ todoPage }) => {
    await todoPage.addTodo("First");
    await todoPage.addTodo("Second");
    await todoPage.addTodo("Third");
    await expect(todoPage.todoItems).toHaveText(["First", "Second", "Third"]);
  });

  test("input clears after adding", async ({ todoPage }) => {
    await todoPage.addTodo("Check input clears");
    await expect(todoPage.input).toHaveValue("");
  });
});

// ── Completing todos ───────────────────────────────────────────────
test.describe("Completing todos", () => {
  test("completes a single todo", async ({ todoPage }) => {
    await todoPage.addTodo("Learn fixtures");
    await todoPage.completeTodo(0);
    await expect(todoPage.todoItems.first()).toHaveClass(/completed/);
  });

  test("completes all todos", async ({ todoPage }) => {
    await todoPage.addTodo("Task one");
    await todoPage.addTodo("Task two");
    await todoPage.completeAll();
    await expect(todoPage.todoItems.nth(0)).toHaveClass(/completed/);
    await expect(todoPage.todoItems.nth(1)).toHaveClass(/completed/);
  });
});

// ── Challenge - Deleting todos ───────────────────────────────────────────────
test.describe("Deleting todos", () => {
  test("deletes a single todo", async ({ todoPage }) => {
    await todoPage.addTodo("Task one");
    await todoPage.addTodo("Task two");
    await todoPage.deleteTodo(0);                          
    await expect(todoPage.todoItems).toHaveCount(1);       
    await expect(todoPage.todoItems.first()).toContainText("Task two"); 
  });

  test("deletes all todos", async ({ todoPage }) => {
    await todoPage.addTodo("Task one");
    await todoPage.addTodo("Task two");
    await todoPage.deleteAll();                     
    await expect(todoPage.todoItems).toHaveCount(0); 
  });
});