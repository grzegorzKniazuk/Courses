import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    public readonly username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/\w+/, { message: 'to jest przykladowa wiadomosc walidacji' })
    public readonly password: string;
}
