const {test,expect} = require("@playwright/test");
const {TodoPage} = require("./pages/TodoPage");
const { todo } = require("node:test");

test("can add a single todo", async ({page})=>{
    const todoPage = new TodoPage(page);
    await todoPage.goto()

    await todoPage.addTodo("Buy groceries");

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText("Buy groceries");

})


test("can add multiple todos", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  await todoPage.addTodo("First task");
  await todoPage.addTodo("Second task");
  await todoPage.addTodo("Third task");

  await expect(todoPage.todoItems).toHaveCount(3);

})

test("can complete a todo", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  await todoPage.addTodo("Complete this task");
  await todoPage.completeTodo(0);

  await expect(todoPage.todoItems.first()).toHaveClass(/completed/);
})

test("can delete a todo", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  await todoPage.addTodo("Delete this task");
  await todoPage.addTodo("Keep this task");

  await todoPage.deleteTodo(0);

  await expect(todoPage.todoItems).toHaveCount(1);
  await expect(todoPage.todoItems.first()).toContainText("Keep this task");
});


// Challenge to mark all tdods completed.

test("complete all tasks", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  await todoPage.addTodo("1st Task");
  await todoPage.addTodo("2nd Task");
  await todoPage.addTodo("3rd Task");

  await todoPage.completeAll(); 

  await expect(todoPage.todoItems.first()).toHaveClass(/completed/);
  await expect(todoPage.todoItems.nth(1)).toHaveClass(/completed/);
  await expect(todoPage.todoItems.last()).toHaveClass(/completed/);
});