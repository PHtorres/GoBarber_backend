import ISendMailDTO from '../DTO/ISendMailDTO';
export default interface IMailProvider{
    sendMail(data: ISendMailDTO):Promise<void>;
}
