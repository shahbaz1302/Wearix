// import { MailtrapClient } from "mailtrap"
// import dotenv from "dotenv"

// dotenv.config()
 
// const TOKEN = process.env.MAILTRAP_TOKEN;

// export const mailtrapClient = new MailtrapClient({
//   token: TOKEN,
// });

// export const sender = {
//   email: "hello@demomailtrap.co",
//   name: "Wearix",
// };

import { Resend } from "resend";
import dotenv from "dotenv"

dotenv.config()

export const resend = new Resend(process.env.RESEND_API_KEY);

