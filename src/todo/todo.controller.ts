import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { response } from 'express';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  // ADD NEW TODO ..
  @Post(':userId')
  async addNewTodo(@Res() response, @Body(ValidationPipe) todo: CreateTodoDto, @Param('userId') id: number) {
    const newTodo = await this.todoService.addNewTodo(todo, id);
    response.status(HttpStatus.CREATED).json({
      statusCode: 201,
      message: 'Todo Added Successfully.',
      todoData: newTodo
    })
  }

  // Fetch all todos by single user..
  @Get(':userId')
  async getAllTodosByUser(@Res() response, @Param('userId') id: number) {
    const todoList = await this.todoService.getAllTodosByUser(id);
    response.status(HttpStatus.OK).json({
      statusCode: 200,
      todoList
    })
  }

  // Update todos status after completed..
  @Patch(':todoId')
  async updateTodosStatus(@Res() response, @Param('todoId') id: number) {
    const updateTodo = await this.todoService.updateTodosStatus(id);
    response.status(HttpStatus.OK).json({
      statusCode: 200,
      message:"Todos complted successfully.",
      updateTodo
    })
  }

  // Delete user todo..
  @Delete(':todoId')
  async removeUserTodos(@Res() response, @Param('todoId') id: number) {
    const deletedTodo = await this.todoService.removeUserTodos(id);
    response.status(HttpStatus.OK).json({
      statusCode: 200,
      message:"Todos Deleted Succesfuly.",
      deletedTodo
    })
  }

}
