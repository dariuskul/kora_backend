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
      refreshToken: '1//041Osx8KPWSQZCgYIARAAGAQSNwF-L9IrobIPKpETYDVf3uI3BVS8830f5M4lZosLOCbZhBQR65PnCGyoDc4fuZMgveWGop5_aEA',
      accessToken: 'ya29.A0ARrdaM9YiGhW2D-fpUNyb_yFKpuqaEBmG3EwmTUu-Q-kPD7ldem6bRTaxUN6WguiNMWoc88XzMWou1Y0H9Wk5uHU8CuW_05Rd0NAaF-DF5B7ZMsYV13dVcn4DRXbw6R_wKpLLa9Zyex9lZSi9G58oVzxn_hM',
    }
  });

  return transporter;
};


