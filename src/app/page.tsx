'use client';

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [enteredTodo, setEnteredTodo] = useState('');
  const [beUpdated, setBeUpdated] = useState(false);
  const [beUpdatedId, setBeUpdatedId] = useState(null);

  const fetchTodos = async () => {
    const loading = toast.loading('Loading Todos');
    try {
      const response = await fetch('/api/todo');

      if (!response.ok) {
        throw new Error('Someting went wrong');
      }

      const data = await response.json();
      setTodos(data.data.todos);
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(loading);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: enteredTodo }),
      });

      const data = await response.json();

      if (data.status === 'fail') throw new Error(data.message);

      const todo = data.data.todo;

      setTodos((prevTodos) => [...prevTodos, todo]);

      if (data.status === 'success') toast.success('Todo is added');

      setEnteredTodo('');
    } catch (err: any) {
      console.log(err);
      fetchTodos();
      toast.error(err.message);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      // Optimistic UI update - remove todo from UI state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));

      const response = await fetch(`/api/todo/${todoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast.success('Todo is deleted');
    } catch (err) {
      // Handle error and potentially revert UI update
      console.log(err);
      toast.error('Failed to delete todo');
      fetchTodos(); // Re-fetch todos to revert optimistic UI update
    }
  };

  const updateTodo = async (todoId: string) => {
    const todo = todos.find((todo) => todo._id === todoId);
    setEnteredTodo(todo.todo);
    setBeUpdatedId(todo._id);
    setBeUpdated(true);
  };

  const updateHandler = async () => {
    try {
      const response = await fetch(`/api/todo/${beUpdatedId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: enteredTodo }),
      });

      const data = await response.json();

      if (data.status === 'fail') throw new Error(data.message);

      const todo = data.data.todo;

      setTodos((prevTodos) => {
        const filteredTodo = prevTodos.filter(
          (prevTodo) => prevTodo._id !== todo._id
        );

        return [...filteredTodo, todo];
      });

      if (data.status === 'success') {
        toast.success('Todo is updated');
        setBeUpdated(false);
      }

      setEnteredTodo('');
    } catch (err: any) {
      console.log(err);
      fetchTodos();
      toast.error(err.message);
    }
  };

  const updateResetHandler = () => {
    setBeUpdated(false);
    setBeUpdatedId(null);
    setEnteredTodo('');
  };

  return (
    <main className="w-80 mx-auto">
      <Toaster />
      <div className="mt-20">
        <h2 className="mb-2 text-lg text-gray-500">Todo Items</h2>
        <form onSubmit={submitHandler} className="flex gap-2 w-full">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Type a todo..."
              value={enteredTodo}
              required
              className="px-2 py-2.5 rounded text-sm w-full focus:outline-none"
              onChange={(e) => setEnteredTodo(e.target.value)}
            />
            {beUpdated && (
              <XMarkIcon
                onClick={updateResetHandler}
                className="w-5 h-5 text-gray-500 cursor-pointer absolute right-2 top-2.5"
              />
            )}
          </div>
          {!beUpdated ? (
            <button
              type="submit"
              className="px-2 py-2 bg-orange-500 rounded text-white hover:bg-orange-600"
            >
              Add
            </button>
          ) : (
            <button
              type="button"
              onClick={updateHandler}
              className="px-2 py-2 bg-green-600 rounded text-white hover:bg-green-700"
            >
              Update
            </button>
          )}
        </form>
        <ul className="mt-8 flex flex-col-reverse gap-2">
          {todos.map((todo) => {
            return (
              <li
                key={todo._id}
                className="bg-white shadow px-2 py-2 rounded flex justify-between items-center"
              >
                <p onClick={() => updateTodo(todo._id)}>{todo.todo}</p>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo._id)}
                  className="text-xs "
                >
                  ❌
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
