import transporter from "../../utils/sendMail.js";
import User from "../../model/UserModel.js";

export const forgotPassword = async (req, res) => {

  try {

    const { email_id, mobile_no } = req.body;

    const user = await User.findOne({
      email_id,
      mobile_no
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Generate OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    // Send Email
   await transporter.sendMail({
  from: "khatriom12062007@gmail.com",
  to: email_id,
  subject: "Password Reset OTP",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset OTP</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f7; line-height: 1.6;">
      <div style="max-width: 560px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 12px;">🔐</div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Password Reset</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Secure Authentication Required</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 32px;">
          <p style="color: #4a5568; font-size: 16px; margin: 0 0 20px 0;">Hello,</p>
          <p style="color: #4a5568; font-size: 16px; margin: 0 0 24px 0;">We received a request to reset your password. Use the following OTP to complete the process. This code is valid for <strong>10 minutes</strong>.</p>
          
          <!-- OTP Box -->
          <div style="background: #f7fafc; border-radius: 12px; padding: 32px; text-align: center; margin: 28px 0; border: 1px solid #e2e8f0;">
            <p style="color: #718096; font-size: 14px; margin: 0 0 12px 0; letter-spacing: 1px;">YOUR ONE-TIME PASSWORD</p>
            <div style="font-size: 48px; font-weight: 700; letter-spacing: 8px; color: #2d3748; background: white; padding: 20px; border-radius: 8px; font-family: 'Courier New', monospace;">${otp}</div>
            <p style="color: #e53e3e; font-size: 13px; margin: 16px 0 0 0;">⚠️ Do not share this code with anyone</p>
          </div>
          
          <!-- Warning Box -->
          <div style="background: #fff5f5; border-left: 4px solid #fc8181; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; color: #c53030; font-size: 14px;"><strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email or contact support immediately.</p>
          </div>
          
          <p style="color: #4a5568; font-size: 14px; margin: 28px 0 0 0;">For security reasons, never share this OTP with anyone, including our support team.</p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f7fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #a0aec0; font-size: 12px; margin: 0;">This is an automated message, please do not reply to this email.</p>
          <p style="color: #a0aec0; font-size: 12px; margin: 8px 0 0 0;">&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
});

    // Save OTP in DB
    user.otp = otp;
    user.otpExpire = Date.now() + 2 * 60 * 1000; // 2 minutes expiry
    await user.save();

    res.status(200).json({
      message: "OTP Sent Successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};