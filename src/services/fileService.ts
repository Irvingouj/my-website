import { FILE_URL_FIND_BY_TITLE } from "../properties";

export async function getAboutMe(){
    let res = await fetch(FILE_URL_FIND_BY_TITLE+'aboutme');
    let data = await res.json();
    return data.content;
}