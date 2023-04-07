import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


  // CREATE USER ACCOUNT..
  async userRegistration(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException("Error Occured", error);
    }

  }


  // Find All Users Details ...
  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(`Error Occured: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  //Find User By ID..
  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }


  // DELETE USER RECORDS...
  async deleteUserRecords(id: number) {
    try {
      const findUser = await this.userRepository.findOneBy({ id });
      if (!findUser) throw new HttpException("No User EXISTS!!", HttpStatus.NOT_FOUND);
      else await this.userRepository.delete({ id });
    } catch (error) {
      throw new HttpException("Error Occured", error);
    }
  }


  //FIND USER BY EMAIL..
  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } })
  }

}
