import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly emailService: EmailService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sendDailyNotifications() {
    // Aquí va la lógica para enviar notificaciones
    console.log('Daily notification cron executed');
  }

  //prueba para funcion cron si funciona
//   @Cron(CronExpression.EVERY_MINUTE)
//   async sendTestNotifications() {
//   console.log('Notification cron executed!');
//}
}