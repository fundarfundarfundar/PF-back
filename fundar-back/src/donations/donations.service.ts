import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationsRepository } from './donations.repository';

@Injectable()
export class DonationsService {
  constructor(private donationsRepository: DonationsRepository) {}

  createDonation(createDonationDto: CreateDonationDto) {
    return this.donationsRepository.createDonation(createDonationDto);
  }

  GetDonations() {
    return this.donationsRepository.getDonations();
  }

  getDonationById(id: string) {
    return this.donationsRepository.getDonationById(id);
  }

  updateDonation(id: string, updateDonationDto: UpdateDonationDto) {
    return this.donationsRepository.updateDonation(id, updateDonationDto);
  }

  deleteDonation(id: string) {
    return this.donationsRepository.deleteDonation(id);
  }
}
