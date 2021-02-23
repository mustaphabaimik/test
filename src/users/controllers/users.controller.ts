import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of Users' })
  find(@Query('page') p: string, @Query('limit') l: string) {
    const page = p ? parseInt(p, 10) : 1;
    const limit = l ? parseInt(l, 10) : 100;
    return this.usersService.find({}, { page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a specific User' })
  findById(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new User' })
  create(@Body() body: CreateUserDTO) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific User' })
  update(@Param('id') id: number, @Body() body: UpdateUserDTO) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific User' })
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
