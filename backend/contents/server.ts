import { response } from "express";
import { v4 as uuidv4 } from "uuid"

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

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});

app.post("/account/signup", async(req: any, res: any) => {
  const { email, username, password } = req.body;
  const token = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
})