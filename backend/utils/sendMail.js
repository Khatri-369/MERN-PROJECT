// utils/sendMail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "khatriom12062007@gmail.com",
    pass: "sbiq xcjh gbdn kybk"
  }
});

export default transporter;