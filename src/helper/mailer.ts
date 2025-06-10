import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export enum EmailType {
	Verification = "Verification",
	ResetPassword = "ResetPassword",
}

interface SendEmailParams {
	email: string;
	emailType: EmailType;
	userId: string;
}

export const sendEmail = async ({
	email,
	emailType,
	userId,
}: SendEmailParams) => {
	try {
		const hashedToken = await bcrypt.hash(userId.toString(), 10);
		//todo configure mail for usage
		if (emailType === "Verification") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
			});
		} else if (emailType === "ResetPassword") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordExpiry: new Date(Date.now() + 60 * 60 * 1000),
			});
		}

		const transporter = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "5512f958775750", // ❌
				pass: "cc43275fc8dff1", // ❌  why here not using env variables?
			},
		});

		const mailOptions = {
			from: "sender@mail.ai",
			to: email,
			subject:
				emailType === EmailType.Verification
					? "Verify your email"
					: "Reset your password",

			html: `<p>Click <a href="${process.env.DOMAIN}/${
				emailType === EmailType.Verification ? "verifyemail" : "resetpassword"
			}?token=${hashedToken}">here</a> to ${
				emailType === EmailType.Verification
					? "verify your email"
					: "reset your password"
			}
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/${
				emailType === EmailType.Verification ? "verifyemail" : "resetpassword"
			}?token=${hashedToken}
            </p>
            `,
		};

		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message || "Failed to send email");
	}
};
