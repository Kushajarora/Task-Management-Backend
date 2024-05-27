import { Body, Controller,Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordResetDto, UserDetailsDto, VerifyUserDto } from './dtos/userdetails.dto';
import { JwtGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService){}

    @Post('register')
    registerUser(@Body() UserDetailsDto:UserDetailsDto){
        return this.AuthService.newUser(UserDetailsDto)
    }

    @Post('login')
    loginUser(@Body() VerifyUserDto:VerifyUserDto){
        return this.AuthService.login(VerifyUserDto)
    }

    @UseGuards(JwtGuard)
    @Post('forgot-password')
    resetPassword(@Body() PasswordResetDto: PasswordResetDto){
        return this.AuthService.passwordReset(PasswordResetDto)
    }

    // @Get('logout/:username')
    // logoutUser(@Param("username") username: string){
    //     return this.AuthService.logOut(username)
    // }
}
