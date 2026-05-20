const { test: base, expect } = require("@playwright/test");
const { TodoPage } = require("./pages/TodoPage");

// Extend the base test with our custom fixture
const test = base.extend({
  // "todoPage" is now available in every test automatically
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);        // ← run the test with this todoPage
    // anything after use() runs as teardown
  },
});

module.exports = { test, expect };