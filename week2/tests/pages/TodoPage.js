const { todo } = require("node:test");

class TodoPage{
    constructor(page){
        this.page = page;

        this.input = page.getByPlaceholder("What needs to be done?");
        this.todoItems = page.locator(".todo-list li");
        this.toggleAll = page.locator(".toggle-all");
        this.itemCount = page.locator(".todo-count");

    }
    async goto(){
        await this.page.goto("https://todomvc.com/examples/react/dist/");
    }

    async addTodo(text){
        await this.input.fill(text);
        await this.page.keyboard.press("Enter");

    }
    async completeTodo(index){
        await this.todoItems.nth(index).locator(".toggle").click();

    }
    async deleteTodo(index){
        await this.todoItems.nth(index).hover();
        await this.todoItems.nth(index).locator(".destroy").click();
    }
    async getCount(){
        return await this.todoItems.count();
    }


   async completeAll() {
    await this.toggleAll.click(); 
}
}

module.exports = {TodoPage};