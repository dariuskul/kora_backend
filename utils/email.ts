import nodemailer from 'nodemailer';

export const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cidukascido@gmail.com',
      pass: 'Rekles123',
    },
  });

  return transporter;
};


