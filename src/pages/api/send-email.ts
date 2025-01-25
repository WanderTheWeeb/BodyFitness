import nodemailer from "nodemailer";
import type { APIContext } from "astro";
import dotenv from "dotenv";

dotenv.config();

export async function POST({ request }: { request: Request }) {
  console.log("Solicitud POST recibida");

  const formData = await request.formData();
  console.log("Datos recibidos:", Object.fromEntries(formData));

  const username = formData.get("username");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  console.log({ username, email, phone, message });
  
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Cambia según el servicio
      port: 587,
      secure: false,
      auth: {
        user: "abidjazinto@gmail.com", // Cambia por  correo
        pass: "woybhlyiomxctxbi", // Usa una contraseña de aplicación
      },
    });

    // Configura el contenido del correo
    await transporter.sendMail({
      from: '"Formulario de Contacto" <tu_correo@gmail.com>', // Correo remitente
      to: "bodyfitness.coatza2024@gmail.com", // Correo del encargado
      subject: "Nuevo contacto desde el formulario", // Asunto
      html: `
        <h1>Nuevo contacto registrado</h1>
        <p><strong>Nombre:</strong> ${username}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Correo enviado exitosamente." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error enviando correo:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error enviando correo." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
