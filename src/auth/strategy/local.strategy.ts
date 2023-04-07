import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private userService: UserService) {
        super({
            usernameField: "email",
            passwordField: "password"
        })
    }

    // Vlidate user credentials...
    async validate(email: string, password: string): Promise<User> {
        const user = await this.userService.findUserByEmail(email);
        if (user && user.password == password) return user;
        else throw new UnauthorizedException("Wrong Credentials!!");
    }
}