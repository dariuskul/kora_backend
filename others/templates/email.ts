import { createTransporter } from "../../utils/email";

export const sendEmail = async (to: Array<string>, html: string, from = 'cidukascido@gmail.com') => {
  const transporter = createTransporter();

  await transporter.sendMail({ from, to, html });
}


export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `localhost:3001/account/verify-email?token=${token}`;
  const message = `<p>Please click the below link to verify your email address:</p>
  <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;

  await sendEmail([email], message);
}