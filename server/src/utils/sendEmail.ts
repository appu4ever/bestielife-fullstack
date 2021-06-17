import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string): Promise<void> {
  //   let testAccount = await nodemailer.createTestAccount();
  //   console.log(testAccount);
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ljc2hzioeqhbn2b2@ethereal.email', // generated ethereal user
      pass: 'XJ9mZJ6zcvT5VYVPX2', // generated ethereal password
    },
  });

  // send mail with defined transport object
  console.log(html);
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: 'Change password link', // Subject line
    html,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
