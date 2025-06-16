import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

describe('ReservationController', () => {
  let reservationController: ReservationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [ReservationService],
    }).compile();

    reservationController = app.get<ReservationController>(
      ReservationController,
    );
  });
});
