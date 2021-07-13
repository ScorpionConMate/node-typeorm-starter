import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import config from '../config/main.config';

interface SendMailOptions {
  from?: string;
  to: string;
  subject: string;
  html: string;
}

export async function SendMail(options: SendMailOptions): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: config.SMTP.PROVIDER,
    port: 587,
    auth: {
      pass: config.SMTP.PASS,
      user: config.SMTP.USER,
    },
  });

  const mailOptions: Mail.Options = {
    from: options.from || '"Boilerplate" <bolierplate.info@bolierplate.com>',
    to: options.to,
    subject: options.subject,
    html: options.html,
  };
  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    }
    console.log(info);
  });
}
