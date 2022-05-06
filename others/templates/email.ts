import { createTransporter } from "../../utils/email";

export const sendEmail = async (to: Array<string>, html: string, from = 'cidukascido@gmail.com', subject?: string) => {
  const transporter = createTransporter();
  try {
    await transporter.sendMail({ from, to: to[0], html, subject: subject || '' });
  } catch (error) {
    throw error;
  }
}


export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `localhost:3001/account/verify-email?token=${token}`;
  const message = `<p>Please click the below link to verify your email address:</p>
  <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;

  await sendEmail([email], message);
}

export const sendEmailRestorationEmail = async (email: string, token: string) => {
  const verifyUrl = `http://localhost:3001/account/restore-password?token=${token}`;
  const message = `<p>Please click the below link to restore password:</p>
  <a href="${verifyUrl}">${verifyUrl}</a>`;

  await sendEmail([email], message);
}

