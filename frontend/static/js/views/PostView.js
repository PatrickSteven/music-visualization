import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing Post");
        this.clientJS = "/static/js/postView.js"
    }


    async getHtml() {
        return `
            <h1>Post</h1>
            <p>You are viewing post #${this.postId}.</p>
            <button type="button" onclick='handleClick()'> Click me </button>
        `;
    };

}

