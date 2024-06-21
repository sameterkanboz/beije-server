import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_ADDRESS, // Your Gmail or Google Workspace account
        pass: process.env.MAIL_PASSWORD, // Your generated app password
      },
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const mailOptions = {
      from: '"Beije Mail Service" <your-email@gmail.com>',
      to: to,
      subject: 'Email Verification',
      text: `Your verification token is: ${token}`,
      html: `<p>Your verification token is: <strong>${token}</strong></p>`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
