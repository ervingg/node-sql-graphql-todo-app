const Todo = require('../models/todo');

const users = [
   {name: 'Igor', age: 30, email: 'igor@gmail.com'},
   {name: 'Elena', age: 24, email: 'elena@gmail.com'}
]

module.exports = {
   test() {
      return {
         count: Math.trunc(Math.random() * 10),
         users
      }
   },

   random({min, max, count}) {
      const arr = [];

      for (let i = 0; i < count; i++) {
         const random = Math.random() * (max - min) + min;
         arr.push(random);
      }

      return arr;
   },

   addTestUser({user: {name, email}}) {
      const user = {
         name: name,
         email: email,
         age: Math.ceil(Math.random() * 30)
      };

      users.push(user);

      return user;
   },

   async getTodos() {
      try {
         return await Todo.findAll();
      } catch (error) {
         throw new Error('Fetch todos is not available!');
      }
   },

   async createTodo({todo}) {
      try {
         return await Todo.create({
            title: todo.title,
            done: false
         });
      } catch (error) {
         throw new Error('Title is incorrect!');
      }
   },

   async completeTodo({id}) {
      try {
         const todo = await Todo.findByPk(id);
         todo.done = true;
         await todo.save();
         return todo;
      } catch (error) {
         throw new Error('Id is required!');
      }
   },

   async deleteTodo({id}) {
      try {
         const todos = await Todo.findAll({
            where: {id}
         });
         await todos[0].destroy();
         return true;
      } catch (error) {
         throw new Error('Removal failed!');
         return false;
      }
   }
};