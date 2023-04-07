import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JWTStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [PassportModule, UserModule,

        // Configure JWT Module for genearating token ...
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configservice: ConfigService) => ({
                secret: configservice.get("JWT_SECRET_KEY"),
                signOptions: { expiresIn: "1h" }
            })
        })
    ],
    controllers: [AuthController],
    providers: [LocalStrategy, JWTStrategy]
})
export class AuthModule {

}