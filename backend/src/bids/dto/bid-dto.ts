import { IsNumber, IsString } from "class-validator";

export class CreateBid{

        @IsNumber()
      amount: number;

      @IsString()
      duration: string;

      @IsString()
      message: string;
}