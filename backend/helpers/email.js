import nodemailer from 'nodemailer';

const email=async (datos)=>{
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });
    const {email,nombre,token}=datos;
    //enviar email
    const info=await transporter.sendMail({
        from:'Twitter',
        to:email,
        subject:'Email de confirmación',
        text:'Confirma que eres tú quien se ha registrado en Twitter',
        html:`
                <p>Hola: ${nombre}, confirma tu registro en Twitter haciendo click en el siguiente enlace: <a href="${process.env.URL_FRONTEND}confirmar/${token}">Confirmar</a></p>
            `
    });
}

export default email;