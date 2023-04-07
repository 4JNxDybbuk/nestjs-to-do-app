import { Controller, Get, Post, Req, Res, Body, Patch, Param, Delete, HttpStatus, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // CREATE USER ACCOUNT..
  @Post('signup')
  async userRegistration(@Res() response, @Body(ValidationPipe) userData: CreateUserDto) {
    const newUser = await this.userService.userRegistration(userData);
    response.status(200).json({
      statusCode: HttpStatus.OK,
      message: 'Account created successfully.',
      newUser
    })
  }

  // Find All Users Details ...
  @Get()
  @UseGuards(new RoleGuard('admin')) // use custom guards..
  async findAll(@Res() response, @Req() request) {
    console.log("Requested User ::: ", request.user);
    const userDetails = await this.userService.findAllUsers();
    response.status(200).json({
      statusCode: HttpStatus.OK,
      userDetails
    })
  }

  // DELETE USER RECORDS...
  @Delete(':id')
  @UseGuards(new RoleGuard('admin')) // use custom guards..
  async remove(@Res() response, @Param('id') id: number) {
    const deleteUserData = await this.userService.deleteUserRecords(id);
    response.status(200).json({
      statusCode: HttpStatus.OK,
      message: 'User Account Deleteed Successfully.',
      deleteUserData
    })
  }
}
