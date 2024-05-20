import nodemailer from 'nodemailer';
import { app } from './app';
import { connectToDb } from './db';
import { settings } from './settings';

const port = settings.PORT;

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
  to: 'xwerdx@mail.ru',
  subject: 'Hello from Nodemailer',
  text: 'hello from thelastandrew',
};

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error sending email: ', error);
//   } else {
//     console.log('Email sent: ', info.response);
//   }
// });

const start = async () => {
  await connectToDb();
  app.listen(port, () => {
    console.log(`Server is up and running on on port ${port}`);
  });
};

start();
