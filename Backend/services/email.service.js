import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// 1. Configuración del Transportador (Conexión SMTP)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true para 465 (SSL/TLS), false para otros (587)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 2. Función de Envío de Correo Genérica
/**
 * Envía un correo electrónico.
 * @param {object} options - Opciones del correo.
 * @param {string} options.to - Destinatario del correo.
 * @param {string} options.subject - Asunto del correo.
 * @param {string} options.html - Contenido del correo en formato HTML.
 */
export const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        };

        const info = await transporter.sendMail(mailOptions);
        
        // Opcional: Loguear el ID del mensaje enviado
        console.log(`Mensaje enviado: ${info.messageId}`);
        
        return info;
    } catch (error) {
        console.error('ERROR al enviar correo:', error.message);
        // Lanzar el error para que sea capturado por el controlador (forgotPassword)
        throw new Error('Fallo al enviar el correo de restablecimiento.');
    }
};

// Opcional: Verificar si la conexión SMTP es exitosa al iniciar el servidor
transporter.verify(function (error, success) {
    if (error) {
        console.error("ERROR: La conexión SMTP falló. Verifica tus credenciales de correo en el .env");
    } else {
        console.log("Servidor SMTP conectado y listo para enviar correos.");
    }
});