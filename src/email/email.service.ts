import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize the transporter with your email sending configuration
    this.transporter = nodemailer.createTransport({
      // Set your email sending configuration here
      // For example, you can use SMTP or a third-party email service
      host: 'smtp.mailtrap.io',
      port: 2525,
      // secure: true,
      auth: {
        user: 'db4ffc1402f6fb',
        pass: '0706c049cde3d9',
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'example@mailtrap.com',
      to,
      subject,
      text: content,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
