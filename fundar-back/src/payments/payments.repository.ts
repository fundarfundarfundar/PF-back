import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsRepository {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
  });

  async createStripeSession(
    amount: number,
    userId: string,
    projectId: string,
  ): Promise<string> {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Donación' },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${frontendUrl}/success`,
        cancel_url: `${frontendUrl}/cancel`,
        metadata: { userId, projectId },
      });
      return session.url!;     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating Stripe session');
    }
  }
}
