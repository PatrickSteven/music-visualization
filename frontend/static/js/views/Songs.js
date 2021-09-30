import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Songs");
        this.endpoint = "https://api.taketones.com/v1/public/tracks/search"
    }

    getSongs(){
        const page = this.params.page ? this.params.page : 1;
        const type = this.params.type;
        const tag = this.params.tag;

        const url = this.endpoint + "?type=" + type + "&tag=" + tag + "&page=" + page;
        console.log(url)

    }

    async getHtml() {
        return `
            ${this.getSongs()}
        `
    }
}
