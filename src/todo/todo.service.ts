import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {

  constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService) { }


  // ADD NEW TODO ..
  async addNewTodo(todo: CreateTodoDto, id: number) {
    try {
      const newTodo = this.todoRepository.create({ ...todo, date: new Date(), completed: false, user: await this.userService.findUserById(id) });
      return this.todoRepository.save(newTodo);
    } catch (error) {
      throw new HttpException('Error Occured', HttpStatus.BAD_REQUEST);
    }
  }

  // Fetch all todos by single user..
  async getAllTodosByUser(userId: number): Promise<Todo[]> {
    try {
      return this.todoRepository.find({ relations: ["user"], where: { user: { id: userId }, completed: false } });
    } catch (error) {
      throw new HttpException('Error Occured', HttpStatus.BAD_REQUEST);
    }

  }


  // Update todos status after completed..
  async updateTodosStatus(todoId: number) {
    try {
      return await this.todoRepository.update({ id: todoId }, { completed: true, date: new Date() });
    } catch (error) {
      throw new HttpException('Error Occured', HttpStatus.BAD_REQUEST);
    }
  }

  // Delete user todo..
  async removeUserTodos(todoId: number) {
    try {
      return await this.todoRepository.delete({ id: todoId });
    } catch (error) {
      throw new HttpException('Error Occured', HttpStatus.BAD_REQUEST);
    }
  }
}
