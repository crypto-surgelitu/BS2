// src/verify.js
import transporter from './transporter.js';

async function verifyConnection() {
  try {
    await transporter.verify();
    console.log('✅ SMTP server is ready to send emails');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
  }
}

verifyConnection();
