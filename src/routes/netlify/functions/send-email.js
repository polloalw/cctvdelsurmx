import nodemailer from 'nodemailer'

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Método no permitido',
    }
  }

  try {
    const data = JSON.parse(event.body)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'contacto@cctvdelsur.mx',
      subject: 'Nuevo contacto desde cctvdelsur.mx',
      text: `
Nombre: ${data.nombre}
Empresa: ${data.empresa}
Teléfono: ${data.telefono}
Servicio: ${data.servicio}

Mensaje:
${data.mensaje}
      `,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: 'Error al enviar correo',
      }),
    }
  }
}
