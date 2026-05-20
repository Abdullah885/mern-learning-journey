const { test, expect } = require("@playwright/test");
const { TodoPage } = require("./pages/TodoPage");

test("page loads correctly", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  // URL and title
  await expect(page).toHaveURL(/react/);
  await expect(page).toHaveTitle(/TodoMVC/);

  // Input is visible and empty
  await expect(todoPage.input).toBeVisible();
  await expect(todoPage.input).toHaveValue("");
});

test("todo list updates correctly", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  // Initially no todos
  await expect(todoPage.todoItems).toHaveCount(0);

  await todoPage.addTodo("First task");
  await todoPage.addTodo("Second task");

  // Now 2 todos
  await expect(todoPage.todoItems).toHaveCount(2);

  // Correct text in correct order
  await expect(todoPage.todoItems).toHaveText(["First task", "Second task"]);
});

test("soft assertions — check all todo states", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  await todoPage.addTodo("Task one");
  await todoPage.addTodo("Task two");
  await todoPage.addTodo("Task three");
  await todoPage.completeTodo(0);

  // Soft — checks everything even if one fails
  await expect.soft(todoPage.todoItems.nth(0)).toHaveClass(/completed/);
  await expect.soft(todoPage.todoItems.nth(1)).not.toHaveClass(/completed/);
  await expect.soft(todoPage.todoItems.nth(2)).not.toHaveClass(/completed/);
  await expect.soft(todoPage.todoItems).toHaveCount(3);
});

// Challenge

test("input clears after adding todo", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  await todoPage.addTodo("First task");
  expect(todoPage.input).toHaveValue("")
  expect(todoPage.todoItems).toHaveCount(1)

});