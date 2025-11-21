import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly emailService: EmailService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES) 
  async sendProjectStatusNotifications() {
    try {
      console.log('Project status notification cron executed');

      const projects = await this.projectsService.getProjects();

      const report = projects.map((project) => {
        const progress = (project.currentAmount / project.goalAmount) * 100;
        return {
          id: project.id,
          name: project.title,
          progress: `${progress.toFixed(2)}%`,
          status:
            progress >= 100
              ? 'Goal reached'
              : progress >= 50
              ? 'On track'
              : 'Needs attention',
        };
      });

      const completedProjects = report.filter(
        (project) => project.status === 'Goal reached',
      );
      const projectsNeedingAttention = report.filter(
        (project) => project.status === 'Needs attention',
      );

      const emailContent = `
        <h1>Project Status Report</h1>
        <h2>Completed Projects</h2>
        <ul>
          ${completedProjects
            .map((project) => `<li>${project.name} (${project.progress})</li>`)
            .join('')}
        </ul>
        <h2>Projects Needing Attention</h2>
        <ul>
          ${projectsNeedingAttention
            .map((project) => `<li>${project.name} (${project.progress})</li>`)
            .join('')}
        </ul>
      `;

      await this.emailService.sendMail(
        'fundarfundarfundar@gmail.com', 
        'Project Status Report',
        emailContent,
      );

      console.log('Project status email sent successfully');
    } catch (error) {
      console.error('Error sending project status notifications:', error.message);
    }
  }
}