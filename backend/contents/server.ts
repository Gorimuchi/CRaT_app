import { response } from "express";
import { v4 as uuidv4 } from "uuid"
import { protocol, frontendHost } from "../../frontend/src/Global"

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const app = express();
const router = express.Router();
const port = 5000;
const mail = 'crat.910@gmail.com';
const pass = 'uypx yrcq scge trqu';
const token = uuidv4();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: mail,
    pass: pass,
  },
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hmys0141',
  database: 'crat',
  port: '3306'
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/requests", (req:any, res:any) => {
  connection.query('SELECT * FROM requests', (err:any, results:any) => {
    if (err) {
      console.error("Database query error: ", err);
      return res.status(500).send('Datebase query error');
    }
    res.json(results);
  });
});

app.post("/account/signin", async(req: any, res: any) => {
  const { email, username, password } = req.body;
  const mailOptions = {
    from: mail,
    to: email,
    subject: 'サインイン確認メール',
    html: `<p>以下のリンクをクリックしてサインインを完了してください。</p><a href="http://localhost:3000">サインインを確認する</a>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json(token);
  } catch {
    res.json({ message: 'メールの送信に失敗しました。' });
  }
});

app.post("/account/signup", async(req: any, res: any) => {
  const { email, username, password } = req.body;

  try {
    const token = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const link = protocol + frontendHost + `/confirm?token=${token}`;

    const mailOptions = {
      from: mail,
      to: email,
      submit: 'メールアドレス確認',
      text: `以下のリンクをクリックして本登録を完了してください：${link}`,
      html: `<p>以下のリンクをクリックして本登録を完了してください：</p><a href="${link}">${link}</a>`
    };
    await transporter.sendMail(mailOptions);

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await connection.query(
      'INSERT INTO pending_users (token, email, username, password, expires_date) VALUES (?, ?, ?, ?, ?)',
      [token, email, username, hashedPassword, expiresAt]
    )

    res.json({ message: '確認メールが送信されました。'})
  } catch (err) {
    res.json({ message: 'エラーが発生しました。' });
  }
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});