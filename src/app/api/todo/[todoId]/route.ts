import connect from '@/dbConfig/dbConfig';
import Todo from '@/models/todoModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

type Params = { params: { todoId: string } };

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    const result = await Todo.findOneAndDelete({ _id: params.todoId });

    if (!result) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Todo deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  try {
    const { todo } = await req.json();
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: params.todoId },
      { todo },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(
      { status: 'success', data: { todo: updatedTodo } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 500 }
    );
  }
};
