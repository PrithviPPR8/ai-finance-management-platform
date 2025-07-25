import { Resend } from "resend";

interface sendEmailProps {
    to: any,
    subject: any,
    react: any,
}

export async function sendEmail({ to, subject, react}: sendEmailProps) {
    const resend = new Resend(process.env.RESEND_API_KEY || "");

    try {
        const data = await resend.emails.send({
            from: "Finance App <onboarding@resend.dev>",
            to,
            subject,
            react,
        })

        return { success: true, data }
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error }
    }
}