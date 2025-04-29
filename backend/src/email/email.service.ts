// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });

    this.transporter.verify((error) => {
        if (error) {
          console.error('SMTP connection error:', error);
        } else {
          console.log('Server is ready to send emails');
        }
      });
  }
// Add this to your EmailService constructor


  async sendPasswordResetEmail(email: string, resetToken: string) {
    // Add validation
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Invalid recipient email address');
    }
  
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;
  
    try {
      await this.transporter.sendMail({
        from: this.configService.get('SMTP_FROM') || '"SkillSync" <no-reply@skillsync.com>',
        to: email, // Make sure this is a string
        subject: 'Password Reset Request',
        html: `
          <p>Click here to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>Link expires in 15 minutes.</p>
        `,
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send password reset email');
    }
  }
  
  public isValidEmail(email: string): boolean { // Change from private to public
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}