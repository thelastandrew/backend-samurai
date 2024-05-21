import nodemailer from 'nodemailer';
import { settings } from '../settings';

export const emailAdapter = {
  sendEmail(email: string, subject: string, message: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: settings.EMAIL_ADDRESS,
        pass: settings.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: settings.EMAIL_ADDRESS,
      to: email,
      subject,
      html: message,
    };

    return transporter.sendMail(mailOptions);
  },
};
