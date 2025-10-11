import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sgMail from '@sendgrid/mail';
@Injectable()
export class EmailService {
  private smtpTransporter: nodemailer.Transporter;

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
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

    this.smtpTransporter = nodemailer.createTransport({
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
    if (process.env.EMAIL_SERVICE_NAME === 'sendgrid') {
      return this.sendWithSendGrid(to, subject, content, options);
    }
    return this.sendWithSMTP(to, subject, content, options);
  }
  /* await sendEmail('user@example.com', 'Hello', 'This is a plain text email'); */
  /*
    await sendEmail('user@example.com', 'Hello', 'Fallback plain text content', {
      html: '<h1>Hello</h1><p>This is HTML content</p>'
    });
  */

  private async sendWithSMTP(
    to: string,
    subject: string,
    content: string,
    options?: {
      html?: string;
      attachments?: nodemailer.Attachment[];
      cc?: string | string[];
      bcc?: string | string[];
    },
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.SMTP_USERNAME,
      to,
      subject,
      text: content,
      ...options,
    };
    await this.smtpTransporter.sendMail(mailOptions);
  }

  private async sendWithSendGrid(
    to: string,
    subject: string,
    content: string,
    options?: {
      html?: string;
      attachments?: nodemailer.Attachment[];
      cc?: string | string[];
      bcc?: string | string[];
    },
  ): Promise<void> {
    const msg: sgMail.MailDataRequired = {
      to,
      // from: `Preprod Laxstat <${process.env.SENDGRID_FROM}>`,
      from: process.env.SENDGRID_FROM,
      subject,
      text: content,
      html: options?.html,
      cc: options?.cc,
      bcc: options?.bcc,
      attachments: options?.attachments?.map(a => ({
        content: a.content?.toString('base64') ?? '',
        filename: a.filename ?? 'file',
        type: a.contentType ?? 'application/octet-stream',
        disposition: 'attachment',
      })),
    };
    await sgMail.send(msg);
  }
}
