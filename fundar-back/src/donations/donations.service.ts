import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationsRepository } from './donations.repository';

@Injectable()
export class DonationsService {

  constructor(private donationsRepository: DonationsRepository){}

  create(createDonationDto: CreateDonationDto) {
    return 'This action adds a new donation';
  }

  findAll() {
    return this.donationsRepository.getDonations();
  }

  findOne(id: number) {
    return `This action returns a #${id} donation`;
  }

  update(id: number, updateDonationDto: UpdateDonationDto) {
    return `This action updates a #${id} donation`;
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }
}
