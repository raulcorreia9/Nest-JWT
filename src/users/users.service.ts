import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './../auth/auth.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User')
        private readonly usersModel: Model<User>,
        private readonly authService: AuthService,
    ){}

    public async signup(signupDTO: SignupDto): Promise<User> {
        const user = new this.usersModel(signupDTO);
        return user.save();
    }

    public async signin(signinDTO: SigninDto): Promise<{name: string; jwtToken: string; email: string;}> {
        const user = await this.findByEmail(signinDTO.email);
        const match = await this.checkPassword(signinDTO.password, user)

        if(!match) {
            throw new NotFoundException('Invalid credentials.')
        }

        const jwtToken = await this.authService.createAcessToken(user._id);

        return {name: user.name, jwtToken, email: user.email}
    }

    public async findAll(): Promise<User[]> {
        return this.usersModel.find();
    }

    private async findByEmail(email: string): Promise<User> {
        const user = this.usersModel.findOne({ email });
        if(!user) {
            throw new NotFoundException('Email not found.');
        }

        return user;
    }

    private async checkPassword(password: string, user: User): Promise<boolean> {
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            throw new NotFoundException('Password not found.')
        }

        return match;
    }
}
