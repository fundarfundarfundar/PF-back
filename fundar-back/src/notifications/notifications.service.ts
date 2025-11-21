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

  @Cron('0 */6 * * *')
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
            Project Status Report
            Completed Projects
        
          ${completedProjects
            .map((project) => `${project.name} (${project.progress})`)
            .join('')}
        
          Projects Needing Attention
        
          ${projectsNeedingAttention
            .map((project) => `${project.name} (${project.progress})`)
            .join('')}
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