import { Body, Controller,Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { isArray } from 'util';
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService) {}
    @ApiOkResponse({type: User,isArray:true})
    @ApiQuery({name: 'name', required: false})
    @Get()
    getUsers(@Query('name')name:string): User []{
        return this.usersService.findAll(name);
    }
    @ApiOkResponse({type: User , description : 'The user has been successfully found.'})
    @ApiNotFoundResponse()
    @Get(':id')
    getUserById(@Param('id',ParseIntPipe)id: number): User{
        const user = this.usersService.fineById(id);
        if(!user){
            throw new NotFoundException();
        }
        return user;
    }
    @ApiCreatedResponse({type: User})
    @ApiBadRequestResponse()
    @Post()
    createUser(@Body() body : CreateUserDto ):User{
        return this.usersService.createUser(body);
    }
}
