import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Music");
        this.endpoint = "api.taketones.com/v1/public/tracks/";
        this.musicSelectionData = {}
    }
   
    async create(){
        let result = await this.getMusicSelection();
        this.musicSelectionData = JSON.parse(result);
        console.log(this.musicSelectionData)
    }

    getMusicSelection(){

        return new Promise(function (resolve, reject) {

            const url = "https://api.taketones.com/v1/public/tags?tag[]=genre&tag[]=mood&tag[]=type"
            const http = new XMLHttpRequest();
            http.open("GET", url);

            http.onload = function() {
                if (http.status != 200) { // analyze HTTP status of the response
                    reject({
                        status: this.status,
                        statusText: http.statusText
                    })
                } else { // show the result
                    resolve(http.response) 
                }
            };

            http.onerror = function() {
              console.log("Request failed");
            };

            http.send();
        });
    }



    async getHtml() {
        return`
        <h1> Select </h1>
        ${this.create()}
        `;
    }
}
