import {
  BadRequestException,
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
  find(
    @Query('page') p: string,
    @Query('limit') l: string,
    @Query('select') s: string,
  ) {
    const page = p ? parseInt(p, 10) : 1;
    const limit = l ? parseInt(l, 10) : 100;
    let select;
    try {
      select = s ? JSON.parse(s) : [];
    } catch (error) {
      throw new BadRequestException(
        error,
        'select query param must be an array of strings',
      );
    }
    return this.usersService.find({}, { page, limit, select });
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
