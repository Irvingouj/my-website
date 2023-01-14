const BasicInfoSource = {
    name : 'Irving Ou' ,
    email : 'oujunyiirving@gmail.com',
    phone : '+1 289-788-6925',
    github : 'https://github.com/Irvingouj',
    linkedin : 'https://www.linkedin.com/in/irving-ou-8b195b1b1/',
    wechat: 'JunyiOu99'

}

type Texts = {
    firstParagraph: string;
    photoWallParagraph: string;
    gameExplanation: string;
    gameName: string;
    gameInstruction: string;
}

const EnglishTexts:Texts = {
    firstParagraph: "",
    photoWallParagraph: "",
    gameExplanation: "",
    gameName: "",
    gameInstruction: ""
}

const ChineseTexts:Texts = {
    firstParagraph: "",
    photoWallParagraph: "",
    gameExplanation: "",
    gameName: "",
    gameInstruction: ""
}


export const Language: 'Chinese' | 'English' = 'English';

export const GetText = {
    name : () => BasicInfoSource.name,
    email : () => BasicInfoSource.email,
    phone : () => BasicInfoSource.phone,
    github : () => BasicInfoSource.github,
    linkedin : () => BasicInfoSource.linkedin,
    wechat: () => BasicInfoSource.wechat,
    Texts: () => {
        if (Language === 'English') {
            return EnglishTexts;
        } 
        return ChineseTexts;
    }
};

