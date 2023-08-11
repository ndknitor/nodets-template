import { IsDefined, IsEmail, MinLength } from "class-validator";

export default class SignInRequest {
    @IsDefined({message : 'Email is required'})
    @IsEmail({}, {message : 'Invalid email'})
    email: string;

    @IsDefined({message : 'Password is required'})
    @MinLength(6, {message : 'Password must be at least 6 characters'})
    password: string;
}