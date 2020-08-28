const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendValidationMail = async (to, hash) => {
  await this.send({
    to,
    subject: 'WaiterMaster validation',
    text: `Validation Link: localhost:3001/auth/validation/establishment/${hash}`
  });
};

exports.send = async ({ to, subject, text }) => {
  try {
    await sgMail.send({
      to,
      from: process.env.MAIN_MAIL,
      subject,
      text
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
