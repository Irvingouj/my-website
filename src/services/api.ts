export class ApiServices{
    private localHost = "localhost:8080"
   


    /**
     * getMarkdownList -> Ob
     */
    public async getMarkdownList() {
        const res = await fetch(`${this.localHost}/markdown_list`)
        console.log(res)
    }

}