export class FileUpload {
    
  id: string; 
  url: string;
  type: 'photo' | 'video' | 'document'; 
  projectId?: string; 
  userId?: string;
}
