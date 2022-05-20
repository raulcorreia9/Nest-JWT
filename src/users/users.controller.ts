import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/users.model';
import { get } from 'http';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    public async signup(@Body() signupDTO: SignupDto): Promise<User> {
        return this.userService.signup(signupDTO);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async signin(@Body() signinDTO: SigninDto): Promise<{name: string; jwtToken: string; email: string;}> {
        return this.userService.signin(signinDTO);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
