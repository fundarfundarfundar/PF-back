import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonationsRepository {

  constructor(
    @InjectRepository(Donation)
    private readonly donationsRepository: Repository<Donation>,
  ) {}

  async createDonation(donationData: Partial<Donation>) {
    const newDonation = this.donationsRepository.create(donationData);
    return await this.donationsRepository.save(newDonation);
  }
  
  async getDonations() {
    return this.donationsRepository.find();
  }
  async getDonationById(id: string) {
    return await this.donationsRepository.findOne({ where: { id } });
  }
  async updateDonation(id: string, updateDonationDto: UpdateDonationDto) {
    await this.donationsRepository.update(id, updateDonationDto);
    return await this.donationsRepository.findOne({ where: { id } });
  }
  async deleteDonation(id: string) {
    await this.donationsRepository.delete(id);
  }
}
