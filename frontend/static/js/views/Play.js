import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Play");
    }

    async getHtml() {
        console.log(this.params.name)
        console.log(atob(this.params.audio))
    }
}
