function timeout(ms:number):Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn:Function, ...args:any[]) {
    await timeout(3000);
    return fn(...args);
}

async function getMarkdown(id:string) {
    await sleep(()=>"markDown")
}

export {getMarkdown}