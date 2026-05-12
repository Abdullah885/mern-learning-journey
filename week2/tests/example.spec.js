const { test, expect } = require("@playwright/test");

const APP_URL = "https://todomvc.com/examples/react/dist/";

test("page title is correct", async ({ page }) => {
  await page.goto(APP_URL);
  const title = await page.title();
expect(title).toBe("TodoMVC: React");
});

test("can add a todo item", async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator(".new-todo").fill("Write Playwright tests");
  await page.keyboard.press("Enter");

  const todo = page.locator(".todo-list li");
  await expect(todo).toHaveText("Write Playwright tests");
});

test("can mark todo as complete", async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator(".new-todo").fill("Learn Playwright");
  await page.keyboard.press("Enter");

  await page.locator(".toggle").click();

  await expect(page.locator(".todo-list li")).toHaveClass(/completed/);
});