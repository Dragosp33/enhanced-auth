import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification-token?token=${token}`;

  await resend.emails.send({
    from: 'no-reply-dpc@dragospolifronie.com',
    to: email,
    subject: 'Confirm your account!',
    html: `<p>  Click <a href=${confirmLink}> here </a> to confirm your account !</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const passLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'no-reply-dpc@dragospolifronie.com',
    to: email,
    subject: 'Forgot password',
    html: `
    <!DOCTYPE html>
<html>
  <head>
    <title>Reset your password.</title>
    <meta charset="UTF-8" />
   
  </head>

  <body>
    <div style="width: 100%; margin: auto 0px;">
 <h3 style="margin-bottom: 1rem;"> We sent you this email at your request to change your password </h3>
    <h5>  Click <a href=${passLink}> here </a> to change your password !</h5>
    <p> The link is available for 1 hour only.</p>
    <p style="font-style: italic;"> If you did not request this, you can ignore this email. </p>
    <h5 style="margin-top: 2rem; align-self: left; "> Best regards, DPC!</h5> 
    </div>
  </body>
</html>
    
   
    `,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'no-reply-dpc@dragospolifronie.com',
    to: email,
    subject: '2FA Confirmation',
    html: `<p>  Your 2FA code is: ${token}</p>`,
  });
};

export const sendChangePassEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'no-reply-dpc@dragospolifronie.com',
    to: email,
    subject: 'OTP Change Pass code',
    html: `<div>
    <h1> You requested a one-time code to change your password </h1>
    <p>  Your OTP code is: ${token}</p>
    <p> This is available for 5 minutes only </p>
     <p style="font-style: italic;"> If you did not request this, you should consider changing your password or enabling 2FA. </p>
     <h5 style="margin-top: 2rem; align-self: left; "> Best regards, DPC!</h5> 
    </div>`,
  });
};

export const sendChangeEmailsEmail = async (
  oldEmail: string,
  newEmail: string,
  oldToken: string,
  newToken: string
) => {
  const oldMailSent = resend.emails.send({
    from: 'no-reply-dpc@dragospolifronie.com',
    to: oldEmail,
    subject: 'OTP Change email',
    html: `<div>
    <h1> You requested a one-time code to change your email </h1>
    <p>  Your OTP code is: ${oldToken}</p>
    <p> This is available for 5 minutes only </p>
     <p style="font-style: italic;"> If you did not request this, you should consider changing your password or enabling 2FA. </p>
     <h5 style="margin-top: 2rem; align-self: left; "> Best regards, DPC!</h5> 
    </div>`,
  });
  const newMailSent = resend.emails.send({
    from: 'no-reply-dpc@dragospolifronie.com',
    to: newEmail,
    subject: 'OTP Change email',
    html: `<div>
    <h1> OTP for email change </h1>
    <p>  Your OTP code is: ${newToken}</p>
    <p> This is available for 5 minutes only </p>
    <p> You receive this because a request was made to transfer an account from our platform to this email </p>
     <p style="font-style: italic;"> If you did not request this, you can ignore this email. </p>
     <h5 style="margin-top: 2rem; align-self: left; "> Best regards, DPC!</h5> 
    </div>`,
  });

  await Promise.all([oldMailSent, newMailSent]);
};
