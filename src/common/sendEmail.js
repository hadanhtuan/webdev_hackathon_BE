const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

async function sendEmail(options) {
	const accessToken = await oAuth2Client.getAccessToken();

	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAUTH2',
			user: process.env.MAIL,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			accessToken: accessToken,
			refreshToken: process.env.REFRESH_TOKEN
		},
	});

	const mailOptions = {
		from: 'hadanhtuan1210@gmail.com',
		to: options.to,
		subject: options.subject,
		html: options.text,
	};	

	
	transporter.sendMail(mailOptions);

}


module.exports.sendEmail = sendEmail;
