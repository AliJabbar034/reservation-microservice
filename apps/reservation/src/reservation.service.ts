import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './model/reservation.model';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    try {
      const reservation = this.reservationRepository.create({
        ...createReservationDto,
        userId,
      });
      return this.reservationRepository.save(reservation);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
