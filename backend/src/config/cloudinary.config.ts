import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

@Injectable()
export class CloudinaryConfigService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'dwfrc76yf',
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY') || '859695816119394',
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET') || '3w_Xu2fHbLyRYdRvvMEAgKGA5dM',
    });
  }

  getCloudinary() {
    return cloudinary;
  }
  getMulterStorage() {
    return new CloudinaryStorage({
      cloudinary,
      params: async (req, file) => {
        const rawFileTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/zip',
          '/pdf',
          
        ];
  

        console.log(file.mimetype);
        
        const isRawFile = rawFileTypes.includes(file.mimetype);
  
        console.log('IsRwaw',isRawFile)
      
        
        return {
          folder: 'milestones',
          format: file.mimetype.split('/')[1], // e.g., 'pdf', 'docx'
          public_id: Date.now().toString(),
          resource_type: isRawFile ? 'raw' : 'image', // <-- important
          type: isRawFile ? 'upload' : undefined, // <-- also safe
        };
      },
    //   resource_type: 'auto', // <-- added this outside params (this tells multer to allow raw)
    });
  }
  

  getMulterConfig() {
    return {
      storage: this.getMulterStorage(),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'application/pdf',
          'application/msword', // .doc
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
          'application/zip',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Unsupported file type'), false);
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    };
  }
}
