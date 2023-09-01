import connect from '@/dbConfig/dbConfig';
import Todo from '@/models/todoModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export const POST = async (req: NextRequest) => {
  try {
    const { todo } = await req.json();

    const newTodo = await Todo.create({ todo });

    return NextResponse.json(
      { status: 'success', data: { todo: newTodo } },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const todos = await Todo.find();

    return NextResponse.json({
      status: 'success',
      results: todos.length,
      data: { todos },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 500 }
    );
  }
};
