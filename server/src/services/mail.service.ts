import { Injectable } from '@nestjs/common'
import * as sgMail from '@sendgrid/mail'

@Injectable()
export class MailService {

    constructor() {
        sgMail.setApiKey(process.env.SENDGRID || '')
    }

    sendMail(to: string, subject: string, text: string) {
        const msg = {
            to,
            from: 'simpleTube@info.com',
            subject,
            text,
        };
        sgMail.send(msg);
    }

}