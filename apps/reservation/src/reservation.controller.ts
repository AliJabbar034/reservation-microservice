import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'libs/common/guards/jwt-auth.guards';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createReservationDto: CreateReservationDto) {
    console.log(createReservationDto);
    return this.reservationService.create(createReservationDto);
  }
}
