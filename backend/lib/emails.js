import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { resend } from "./resend.js"

export const sendVerificationEmail=async(email,verificationToken)=>{
    try {
        const response=await resend.emails.send({
            from:"wearix@resend.dev",
            to:[email],
            subject:"Verify your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })
        console.log("Email sent successfully",response)
    } catch (error) {
        console.log(error)
    }
}

export const sendPasswordResetEmail=async(email,resetUrl)=>{
    try {
        const response=await resend.emails.send({
            from:"wearix@resend.dev",
            to:[email],
            subject:"Reset your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetUrl}",resetUrl),
            category:"Password reset"
        })
    } catch (error) {
        console.log(error)
    }
}

export const sendResetSuccessEmail=async(email)=>{
    try {
        const response=await resend.emails.send({
            from:"wearix@resend.dev",
            to:[email],
            subject:"Password reset successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password reset"
        })
    } catch (error) {
        console.log(error)
    }
}