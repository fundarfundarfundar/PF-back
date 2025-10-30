import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async createSession(amount: number, userId: string, projectId: string): Promise<string> {
    return await this.paymentsRepository.createStripeSession(amount, userId, projectId);
  }
}