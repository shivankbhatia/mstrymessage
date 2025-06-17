import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmails';
import { APIResponse } from '../types/ApiResponse';



export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<APIResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'bhatiashivank834@gmail.com',
            subject: 'Mystry Message | Verification Code',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
            react: VerificationEmail({ username, otp: verifyCode })
        });
        return { success: true, message: "Verification mail sent successfully." }
    }
    catch (emailError) {
        console.error("Error Sending Verification Email!", emailError)
        return { success: false, message: "Failed to send verification email." }
    }
}