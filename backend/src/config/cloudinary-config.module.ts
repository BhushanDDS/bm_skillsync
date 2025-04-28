// src/config/cloudinary-config.module.ts
import { Module } from '@nestjs/common'
import { CloudinaryConfigService } from './cloudinary.config';


@Module({
  providers: [CloudinaryConfigService],
  exports: [CloudinaryConfigService],
})
export class CloudinaryConfigModule {}
