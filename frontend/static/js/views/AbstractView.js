export default class {
    constructor(params) {
        this.params = params;
        this.clientJS = []
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }
    
    setClientJS(_clientJS){
        this.clientJS = _clientJS
    }

    getClientJS(){
        return this.clientJS;
    }
}
