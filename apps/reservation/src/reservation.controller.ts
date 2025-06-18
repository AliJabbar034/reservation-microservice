import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'libs/common/guards/jwt-auth.guards';
import { User } from './decorators/user.decorator';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { User as UserType } from './types/user.types';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createReservationDto: CreateReservationDto,
    @User() user: UserType,
  ) {
    return this.reservationService.create(createReservationDto, user.id);
  }
}
