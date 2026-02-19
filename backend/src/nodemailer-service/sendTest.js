// src/sendTest.js
import dotenv from 'dotenv';
import { sendEmail } from './emailService.js';

dotenv.config();

async function main() {
  const result = await sendEmail({
    to: 'emmaculaten136@gmail.com',       // ← change this to your email
    subject: 'Test Email from Nodemailer',
    html: `
      <h1>It works! 🎉</h1>
      <p>Your Nodemailer SMTP service is set up correctly.</p>
    `,
  });

  console.log(result);
}

main();
