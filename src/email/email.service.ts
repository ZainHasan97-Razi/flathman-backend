import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize the transporter with your email sending configuration
    // this.transporter = nodemailer.createTransport({
    //   // Set your email sending configuration here
    //   // For example, you can use SMTP or a third-party email service
    //   host: 'smtp.mailtrap.io',
    //   port: 2525,
    //   // secure: true,
    //   auth: {
    //     user: '7cec85339f33f7',
    //     pass: 'dd13a721debe3e',
    //   },
    // });

    this.transporter = nodemailer.createTransport({
      // Set your email sending configuration here
      // For example, you can use SMTP or a third-party email service
      host: 'smtp.gmail.com',
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(
    to: string, 
    subject: string, 
    content: string,
    options?: {
      html?: string;
      attachments?: nodemailer.Attachment[];
      cc?: string | string[];
      bcc?: string | string[];
    }
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.SMTP_USERNAME,
      to,
      subject,
      text: content,
      ...options
    };

    await this.transporter.sendMail(mailOptions);
  }
  /* await sendEmail('user@example.com', 'Hello', 'This is a plain text email'); */
  /*
    await sendEmail('user@example.com', 'Hello', 'Fallback plain text content', {
      html: '<h1>Hello</h1><p>This is HTML content</p>'
    });
  */
}
