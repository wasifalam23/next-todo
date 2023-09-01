import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, 'Please enter a todo'],
    minLength: [6, 'Must be atleast 5, got {VALUE}'],
  },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default Todo;
