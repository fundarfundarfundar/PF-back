import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EmailModule } from '../email/email.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [EmailModule, ProjectsModule],
  providers: [NotificationsService],
})
export class NotificationsModule {}