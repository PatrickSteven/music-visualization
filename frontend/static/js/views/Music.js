import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Music");
        this.endpoint = "api.taketones.com/v1/public/tracks/";
        this.musicSelectionData = {}
    }
   
    async createMusicSelection(){
        let result = await this.getMusicSelection();
        this.musicSelectionData = JSON.parse(result);

        const GenresSection = this.createSection(this.musicSelectionData.data.Genres, "genre");
        const MoodsSection = this.createSection(this.musicSelectionData.data.Moods, "mood");

        return `
            <div class="container-music-type">
                <h1 class="music-selection-title">Select your favorite
                    <span class="badge rounded-pill bg-primary">Genre</span>
                </h1>
                ${GenresSection}
            </div>

            <div class="container-music-type">
                <h1 class="music-selection-title">Select your
                    <span class="badge rounded-pill bg-primary">Mood</span>
                </h1>
                ${MoodsSection}
            </div>
        `;
    }

    createSection(data, type){
        const textColor = "text-white";
        const divContainerClass = "container-fluid";
        const divCardClass = "col-sm-6 col-md-4 col-lg-3 card-music-type";
        const divImageClass = "rounded img-thumbnail grayscale img-music-type";
        
        var cardForEachMusicType = ""
        data.forEach(function(d){
            cardForEachMusicType +=
                `
                <div class="${divCardClass} ${textColor}">
                <a href="/songs/${type}/${d.slug}" class="nav__link" data-link>
                    <img src="${d.icon}" class="${divImageClass}">
                    <div>
                        <h5 class="text-center">${d.name}</h5>
                    </div>
                </a>
                </div>
                `  
            
        })

        return  `
            <div class="${divContainerClass}">
                <div class="row">
                    ${cardForEachMusicType}
                </div>
            </div>
        `;


    }

    create(){
        var valueResult = this.createMusicSelection().then((result) => {
            return result
        })
        return valueResult
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
        return this.create()
    }
}
