"use server";
import { Resend } from "resend";

const resend = new Resend("re_EwHkJKn7_BqC3Jj57KVoFXeELa5b74Qhd");

export const sendEmail = async (content) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["apargtm@gmail.com"],
    subject: "New Listing",
    html: `<p>${JSON.stringify(content)}</p>`,
  });
  if (error) console.log(error.message);
  console.log(data, error);
};
