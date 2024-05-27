import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDetails } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { PasswordResetDto, UserDetailsDto, VerifyUserDto } from './dtos/userdetails.dto';
import { MongoServerError } from 'mongodb';
import * as argon2 from 'argon2';
import { StatusDto } from 'src/common/enums/dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserDetails.name) private userDetailsModel: Model<UserDetails>,
        private readonly JwtService: JwtService
    ){}
    async newUser(UserDetailsDto: UserDetailsDto) :Promise<StatusDto>{
        try{            
            const hashedP = await argon2.hash(UserDetailsDto.password);
            UserDetailsDto.password=hashedP;
            const newUser=new this.userDetailsModel(UserDetailsDto);
            await newUser.save();
            return {
                Status: true,
            };
        } catch(error){
            if(error instanceof MongoServerError && error.code==11000){
                console.log("User Already Exist");
                throw new HttpException("User already exist",404)
            }
            else{
                console.log("Error creating new User:",error);
                throw error
            }
        }
    }
    async login(VerifyUserDto: VerifyUserDto){
        const user=await this.userDetailsModel.findOne({
            userID: VerifyUserDto.userID
        });
        if(!user){
            throw new HttpException("Failed to verify",404);
        }
        const isSame= await argon2.verify(user.password,VerifyUserDto.password);
        if (isSame){
            const payload={
                name: user.name,
                email: user.email,
                userID: user.userID,
                passport: user.password,
                mpin: user.mpin
            }
            const jwttoken=this.JwtService.sign(payload)
            return {
                Status: true,
                JWTtoken: jwttoken
            }
        }
        throw new HttpException("Failed to verify",404);
    }

    async passwordReset(PasswordResetDto: PasswordResetDto): Promise<StatusDto>{
        const user=await this.userDetailsModel.findOne({
            userID: PasswordResetDto.userID
        });
        if(!user){
            throw new HttpException("User not found",404);
        }
        if(PasswordResetDto.mpin==user.mpin){
            const hashedP=await argon2.hash(PasswordResetDto.newpassword);
            user.password=hashedP;
            await user.save();
            return {
                Status: true
            }
        }
        throw new HttpException("MPIN mismatch",404);
    }

    // async logOut(username: string): Promise<StatusDto>{
    //     const user=await this.userDetailsModel.findOne({
    //         username: username
    //     })
    //     if (!user){
    //         throw new HttpException("User Not logined",404);
    //     }
    //     user.logedinstatus=false;
    //     await user.save();
    //     return{
    //         Status: true
    //     }
    // }
}