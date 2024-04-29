// import { Resend } from "resend";
// // const API_KEY = "re_8zzqZR8d_3XMweqyWMvgvfH18ihwSsLqi";
// const API_KEY = "re_6X8fF9J1_K2pz2sR7CK51PCac8xrpPqQU";
// const resend = new Resend(API_KEY);

// export async function POST(req, res) {
//   console.log("Sending email...");
//   const { content } = await req.json();
//   const { data, error } = await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: "apargtm@gmail.com",
//     subject: "Hello World",
//     html: `<p>${JSON.stringify(content)}</p>`,
//   });
//   if (error) {
//     console.log("error sending email");
//   }
//   res.send("EMAIL SENT");
//   console.log("Email sent");
//   console.log(data);
// }
