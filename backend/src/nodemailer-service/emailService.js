// src/emailService.js
import transporter from './transporter.js';

async function sendEmail({ to, subject, text, html, cc, bcc, attachments }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
      cc,
      bcc,
      attachments,
    });

    console.log(`📧 Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
}

export { sendEmail };
