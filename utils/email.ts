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
      refreshToken: '1//04wK9q62BPNGbCgYIARAAGAQSNwF-L9IrWf7QoTNJxqy3Y7e93hnkxbqsS5sdgxePKHpZTE-_hmDw9GPbAKMIAdDn0cdbEJcGSZw',
      accessToken: 'ya29.a0ARrdaM_UMgTrWdIrenpNijHM3iPqj57jID0oiO_rhzzNRSRNYUKgj2Rw5MJisyWnhYfavaGCBx26rCQqlgPlSS3v0s41sNxgy0CjuUlziYcmKSkbN2szoXbl3-3BhmiVk_lXWvbzjfEJS6WAHMnuy9FJBQDL',
    }
  });

  return transporter;
};


