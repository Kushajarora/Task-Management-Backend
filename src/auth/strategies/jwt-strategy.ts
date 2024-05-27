import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${process.env.JWT_SECRET}`,
        });
    }

    async validate(payload: any){
        return {
            name: payload.name,
            userID: payload.userID,
            password: payload.passport,
            mpin: payload.mpin
        }
    }
}