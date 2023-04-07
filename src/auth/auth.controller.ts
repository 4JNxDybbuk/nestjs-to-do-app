import { Controller, Post, UseGuards, Req, Res, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {

    constructor(private jwtService: JwtService) { }

    //User Login
    @Post('login')
    @UseGuards(AuthGuard("local"))
    userLogin(@Req() request, @Res() response) {
        console.log("Request User : ", request.user);
        const { password, ...payload } = request.user;

        response.status(HttpStatus.OK).json({
            statusCode: 200,
            message: "Login Successfull",
            userData: request.user,
            token: this.jwtService.sign(payload) // generate token..
        })
    }

}