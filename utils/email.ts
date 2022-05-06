import nodemailer from 'nodemailer';

export const createTransporter = () => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'cidukascido@gmail.com',
      clientId: '1046143894075-e8b75khu1rqkh6r6mbq3vgghqp3gh575.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//0453QDHcHVDHFCgYIARAAGAQSNwF-L9IrN6DFvxtwt1k0Fvh3tzGV7lu21zcuy4q52u4q4rkr9nedHTmf8x_xo0hITZUxxLjzZ-k',
      accessToken: 'ya29.A0ARrdaM9BIvsE6axZD8IaaCNh3o319C-D5lxjHka2PcvtDzx4yrg34KWM5eYLlw8twoc6d4mj2kDaB7ID_yJofXRq1BZbkJbWtDz1McKc_gusCB3cLkJeZX32NNSm_hK4uW0rcykqnktIj70wVRkHf-p8cus9',
    }
  });

  return transporter;
};


