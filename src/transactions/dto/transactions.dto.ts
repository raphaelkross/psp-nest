import { IsString, IsInt, IsDefined, IsNumberString, MaxLength, MinLength } from 'class-validator';

export class CreateTransaction {
    @IsDefined()
    @IsNumberString()
    amount: number;

    @IsDefined()
    @IsString()
    description: string;

    @IsDefined()
    @IsString()
    method: string;

    @IsDefined()
    @IsString()
    @IsNumberString()
    @MaxLength(16)
    @MinLength(16)
    card_number: string;

    @IsDefined()
    @IsString()
    card_holder: string;

    @IsDefined()
    @IsString()
    @MaxLength(7)
    @MinLength(7)
    card_expiration: string;

    @IsDefined()
    @IsString()
    @MaxLength(3)
    @MinLength(3)
    card_cvv: string;
}
