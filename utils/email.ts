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
      refreshToken: '1//04lF01XV89kbcCgYIARAAGAQSNwF-L9IrHOBhB1CmZz_sYwLT0LYn_wUVdiAW4KF6km8nmNku8Wkh8HxeWT7BiUM9sBxS4ClNWv4',
      accessToken: 'ya29.A0ARrdaM_nbLQuB6anKlrbKJTufOIv60AVSStwswqIaRDgjeMmvcEajpSoOMRi4g39MBNNRoTUSuftQsi6FB2QUZ5OYiQ-HwNWgSqcbyjwNNN1rTkB5BvYPKhyPjxinVCaJqqLWSxe89Qa-qaEncn54tw958bw',
    }
  });

  return transporter;
};


