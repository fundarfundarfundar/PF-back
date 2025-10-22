import { Injectable } from '@nestjs/common';

@Injectable()
export class DonationsRepository {
  private donations = [
    {
      id: 1,
      amount: '10000',
      date: new Date(),
      user_id: 1,
      project_id: 1,
      payment_method: 'Mercado Pago',
    },
    {
      id: 2,
      amount: '90000',
      date: new Date(),
      user_id: 1,
      project_id: 1,
      payment_method: 'Mercado Pago',
    },
    {
      id: 3,
      amount: '30000',
      date: new Date(),
      user_id: 2,
      project_id: 2,
      payment_method: 'Mercado Pago',
    },
    {
      id: 4,
      amount: '5000',
      date: new Date(),
      user_id: 3,
      project_id: 2,
      payment_method: 'Mercado Pago',
    },
    {
      id: 5,
      amount: '5000',
      date: new Date(),
      user_id: 4,
      project_id: 3,
      payment_method: 'Mercado Pago',
    },
    
  ];

  async getDonations() {
    return this.donations;
  }
}
