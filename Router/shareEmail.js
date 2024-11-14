import nodemailer from "nodemailer";

const sendVerificationEmail = (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: "Email Verification",
      html: `
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
              .e-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .e-header {
                  text-align: center;
                  padding: 10px 0;
              }
              .e-header h1 {
                  margin: 0;
                  color: #4CAF50;
              }
              .e-content {
                  margin: 20px 0;
                  text-align: center;
              }
              .e-content p {
                  font-size: 16px;
              }
              .code {
                  font-size: 24px;
                  font-weight: bold;
                  color: #4CAF50;
                  margin: 20px 0;
              }
              .e-footer {
                  text-align: center;
                  padding: 10px 0;
                  font-size: 12px;
                  color: #aaaaaa;
              }
          </style>
      </head>
      <body>
          <div class="e-container">
              <div class="e-header">
                  <h1>Email Verification</h1>
              </div>
              <div class="e-content">
                  <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
                  <p class="code">${code}</p>
              </div>
              <div class="e-footer">
                  <p>If you did not request this email, please ignore it.</p>
              </div>
          </div>
      </body>
      </html>
      `,
    });

    return info;
  } catch (error) {
    console.error(error.message);
  }
};

export default sendVerificationEmail;
