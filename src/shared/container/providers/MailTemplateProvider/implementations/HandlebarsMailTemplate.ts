import handlebars from 'handlebars';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import fs from 'fs';

export default class HandlebarsMailTemplate implements IMailTemplateProvider {
    public async parse(data: IParseMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(data.file, {encoding:'utf-8'});
        const parseTemplate = handlebars.compile(templateFileContent);
        return parseTemplate(data.variables);
    }
}
