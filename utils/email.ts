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
      refreshToken: '1//04S_vTuEGabPhCgYIARAAGAQSNwF-L9IrtxSFyEVciDex_QEy29i8Bq2bdWXlS3SLTKDm793ZyhLes0TcW8RfhgMi_bse08SscTY',
      accessToken: 'ya29.a0ARrdaM-HnRs0z_xKBoV7UqjWhTmEC_v8rT93J16MBMP2lczwFH2oztWnK6Ffe2n1rGqeSfdBCElVbtb3Hy6GaUnoGIgvmpuzMRCq7a21h9SIUNSP9U2WbedfEOEMcIMVcfgAgjWJBxf7TN-SysIfLT1_Jjjm',
    }
  });

  return transporter;
};


