const {test,expect} = require("@playwright/test");

const APP_URL = "https://todomvc.com/examples/react/dist/";

test("add todo using getByPlaceholder", async ({page}) => {
    await page.goto(APP_URL);

    await page.getByPlaceholder("What needs to be done?").fill("Learn locators");
    await page.keyboard.press("Enter");

    await expect(page.locator(".todo-list li")).toHaveText("Learn locators");
});

test("Add multiple todos and count them", async ({page}) =>{
    await page.goto(APP_URL);

    const input = await page.getByPlaceholder("What needs to be done?")

     // Add 3 todos
    await input.fill("First todo");
    await page.keyboard.press("Enter");

    await input.fill("Second todo");
    await page.keyboard.press("Enter");

    await input.fill("Third todo");
    await page.keyboard.press("Enter");

     // Count how many todos exist
    const todos = page.locator(".todo-list li");
    await expect(todos).toHaveCount(3);
});

test("get specific todo by index" , async ({page}) =>{
    await page.goto(APP_URL);

    const input = page.getByPlaceholder("What needs to be done?");

    await input.fill("First todo");
    await page.keyboard.press("Enter");
    await input.fill("Second todo");
    await page.keyboard.press("Enter");
    await input.fill("Third todo");
    await page.keyboard.press("Enter");

    // Target specific items
    const todos = page.locator(".todo-list li");
    await expect(todos.first()).toContainText("First todo");
    await expect(todos.last()).toContainText("Third todo");
    await expect(todos.nth(1)).toContainText("Second todo");
});
    // Challenge
   test("complete second todo only", async ({ page }) => {
  await page.goto(APP_URL);

  const input = page.getByPlaceholder("What needs to be done?");

  await input.fill("First todo");
  await page.keyboard.press("Enter");
  await input.fill("Second todo");
  await page.keyboard.press("Enter");
  await input.fill("Third todo");
  await page.keyboard.press("Enter");

  // Define todos locator
  const todos = page.locator(".todo-list li");

  // Complete only the second todo
  await todos.nth(1).locator(".toggle").click();

  // Assert each todo's state
  await expect(todos.nth(0)).not.toHaveClass(/completed/); 
  await expect(todos.nth(1)).toHaveClass(/completed/);     
  await expect(todos.nth(2)).not.toHaveClass(/completed/); 
});
    
