import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { promisify } from 'util';
import fs from 'fs';

export default {
  async sendMail(ownerInfos, event, email) {
    const readFile = promisify(fs.readFile);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fardeau.geoffrey@gmail.com',
        pass: 'aclz tjug ctst rdsp',
      },
    });

    const html = await readFile('./app/services/mailer/inviteLink.html', 'utf8');
    const template = handlebars.compile(html);
    const data = {
      firstname: ownerInfos.firstname,
      lastname: ownerInfos.lastname,
      eventPassword: event.event_password,
      eventName: event.event_name,
    };
    const htmlToSend = template(data);

    const mailOptions = {
      from: 'fardeau.geoffrey@gmail.com',
      to: email,
      subject: `WeekAway : ${data.firstname} vous à invité(e) à participer à son évènement`,
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  },

};
