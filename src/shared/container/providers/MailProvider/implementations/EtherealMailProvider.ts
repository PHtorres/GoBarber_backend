import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProider';
import ISendMailDTO from '../DTO/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class EtherealMailProvider implements IMailProvider {

    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }

    public async sendMail(data: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: data.from?.name || 'Equipe GoBarber',
                address: data.from?.email || 'equipe@gobarber.com.br'
            },
            to: {
                name: data.to.name,
                address: data.to.email
            },
            subject: data.subject,
            html: await this.mailTemplateProvider.parse(data.templateData)
        });

        console.log('Nessage sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    }
}
