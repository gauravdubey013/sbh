import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// to send email
export const sendEmail = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: process.env.SMTP_EMAIL_FROM,
    to: to,
    subject: subject,
    html: html,
  });
  return info?.messageId;
};
