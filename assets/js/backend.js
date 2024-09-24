const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: "your_email@gmail.com", // Your email
    pass: "your_email_password", // Your email password or app password
  },
});

// API endpoint to send email
app.post("/send-email", (req, res) => {
  const {
    お名前,
    ふりがな,
    電話番号,
    メールアドレス,
    ご相談内容,
    ご病気,
    行政認定,
  } = req.body;

  const mailOptions = {
    from: "your_email@gmail.com",
    to: メールアドレス, // Send a confirmation to the user
    subject: "お問い合わせ内容の確認",
    text: `お名前: ${お名前}\nふりがな: ${ふりがな}\n電話番号: ${電話番号}\nメールアドレス: ${メールアドレス}\nご相談内容: ${ご相談内容}\nご病気: ${ご病気.join(
      ", "
    )}\n行政認定: ${行政認定.join(", ")}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
