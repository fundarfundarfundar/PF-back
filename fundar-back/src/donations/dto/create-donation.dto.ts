export class CreateDonationDto {
  amount: number;
  date: Date;
  paymentMethod: string;
  userId: string; 
  projectId?: string;
}
