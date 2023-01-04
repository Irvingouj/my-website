export const BackEndHostName = 'http://localhost:8080';
export const MarkdownPath = '/markdown';
export const  getMarkdown = async (id: string):Promise<Markdown> => {
    return await fetch(`${BackEndHostName}${MarkdownPath}/${id}`)
    .then(res => res.json());
}

// todo: only fetch the list of markdowns
export const getMarkdownList = async ():Promise<Markdown[]> => {
    return await fetch(`${BackEndHostName}${MarkdownPath}`)
    .then(res => res.json());
}

export interface Markdown {
    ID: string;
    Title: string;
    Content: string;
    Date: string;
}