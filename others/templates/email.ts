import { createTransporter } from "../../utils/email";

export const sendEmail = async (to: Array<string>, html: string, from = 'cidukascido@gmail.com', subject?: string) => {
  const transporter = createTransporter();
  console.log('to', to);
  try {
    await transporter.sendMail({ from, to: 'dariuux@gmail.com', html, subject: subject || ''  });
      console.log('send')
  } catch (error) {
    console.log('erroras')
  }
}


export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `localhost:3001/account/verify-email?token=${token}`;
  const message = `<p>Please click the below link to verify your email address:</p>
  <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;

  await sendEmail([email], message);
}
