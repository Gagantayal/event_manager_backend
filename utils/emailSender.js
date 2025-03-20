const nodemailer = require('nodemailer');

const sendEmail = async (to, qrCodeUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Event Registration',
    html: `<p>Thank you for registering! Here's your QR code:</p><img src="cid:qrcode" />`,
    attachments: [
      {
        filename: 'qrcode.png',
        path: qrCodeUrl,
        cid: 'qrcode', // Same as src="cid:qrcode" in the HTML
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;