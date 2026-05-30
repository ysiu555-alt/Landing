const nodemailer = require('nodemailer');
require('dotenv').config();

// Настройка SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // false для порта 587, true для 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendVerificationEmail = async (email, code) => {
    try {
        await transporter.sendMail({
            from: `"Kaliang App" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Верификация аккаунта Kaliang',
            text: `Ваш код подтверждения: ${code}. Код действителен 5 минут.`,
            html: `<b>Ваш код подтверждения: ${code}</b><br>Код действителен 5 минут.`,
        });
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

module.exports = { sendVerificationEmail };
