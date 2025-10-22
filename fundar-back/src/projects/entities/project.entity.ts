export class Project {
  id: string;
  title: string;
  description: string;
  date: Date;
  imageUrl: string;
  status: 'active' | 'inactive'; 
  categoryId: string; 
}
