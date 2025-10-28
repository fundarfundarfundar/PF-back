import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonationsRepository {
  private donations = [
    {
      id: '1',
      amount: '10000',
      date: new Date(),
      user_id: 1,
      project_id: 1,
      payment_method: 'Mercado Pago',
    },
    {
      id: '2',
      amount: '90000',
      date: new Date(),
      userId: 1,
      projectId: 1,
      paymentMethod: 'Mercado Pago',
    },
    {
      id: '3',
      amount: '30000',
      date: new Date(),
      user_id: 2,
      project_id: 2,
      payment_method: 'Mercado Pago',
    },
    {
      id: '4',
      amount: '5000',
      date: new Date(),
      user_id: 3,
      project_id: 2,
      payment_method: 'Mercado Pago',
    },
    {
      id: '5',
      amount: '5000',
      date: new Date(),
      user_id: 4,
      project_id: 3,
      payment_method: 'Mercado Pago',
    },
  ];

  constructor(
    @InjectRepository(Donation)
    private readonly donationsRepository: Repository<Donation>,
  ) {}

  createDonation(createDonationDto: CreateDonationDto) {
    const newDonation = this.donationsRepository.create(createDonationDto);
    return this.donationsRepository.save(newDonation);
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
