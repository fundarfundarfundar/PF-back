// import { Controller, Post, Body } from '@nestjs/common';
// import Stripe from 'stripe';

// @Controller('payments')
// export class PaymentsController {
//   private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-09-30.clover' });

//   @Post('create-session')
//   async createSession(@Body() body: { amount: number, userId: string, projectId: string }) {
//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: 'usd',
//           product_data: { name: 'Donación' },
//           unit_amount: body.amount * 100,
//         },
//         quantity: 1,
//       }],
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel',
//       metadata: {
//         userId: body.userId,
//         projectId: body.projectId,
//       },
//     });
//     return { url: session.url };
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-session')
  async createSession(@Body() body: { amount: number, userId: string, projectId: string }) {
    const url = await this.paymentsService.createSession(body.amount, body.userId, body.projectId);
    return { url };
  }
}