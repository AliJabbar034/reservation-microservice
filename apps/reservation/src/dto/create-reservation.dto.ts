import { Transform } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  placeId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsIn(['pending', 'confirmed', 'cancelled'])
  status: string;
}
