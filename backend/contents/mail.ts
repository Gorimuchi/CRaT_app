const nodemailer = require('nodemailer');

const mail = 'crat.910@gmail.com';
const pass = 'uypx yrcq scge trqu';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: mail,
    pass: pass,
  },
});

const mailOptions = {
  from: mail,
  to: "yushi.hy.0110@gmail.com",
  subject: '登録確認メール',
  html: `<p>以下のリンクをクリックして登録を完了してください。</p><a href="http://localhost:3000">登録を確認する</a>`
};

transporter.sendMail(mailOptions);