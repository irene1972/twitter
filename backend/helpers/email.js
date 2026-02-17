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
    const {email,nombre}=datos;
    //enviar email
    const info=await transporter.sendMail({
        from:'DevWebCamp',
        to:email,
        subject:'Envio de email prueba',
        text:'Confirma que ha llegado el email',
        html:`
                <p>Hola: ${nombre}, confirma el envío del email en DevWebCamp</p>
            `
    });
}

export default email;