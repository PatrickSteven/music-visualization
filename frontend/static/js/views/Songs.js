import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Songs");
        this.endpoint = "https://api.taketones.com/v1/public/tracks/search"
        this.songs = {}
    }

    getSongsFromAPI(){
        const page = this.params.page ? this.params.page : 1;
        const type = this.params.type;
        const tag = this.params.tag;
        const url = this.endpoint + "?type=" + type + "&tag=" + tag + "&page=" + page;
        return new Promise(function (resolve, reject) {

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

    async parseSongs(){
        let result = await this.getSongsFromAPI()
        this.songs = JSON.parse(result)
        console.log(this.songs)
       
        var cardForEachSong = ""
        var header = ""
        var pagination = ""

        //Songs details
        this.songs.data.forEach(function(song){ 
            cardForEachSong +=

            `
                <div class="card col-sm-6 card-song" style="width: 18rem;">
                    <a href="#"> 
                        <img src="${song.images.thumbnail}" class="card-img-top img-thumbnail rounded img-song grayscale">
                          <div class="card-body song-card-body text-center">
                            <h5 class="card-title">${song.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${song.author_name}</h6>
                            <p class="card-text">${song.description}</p>
                          </div>
                    </a>
                </div>
            `             
        })

        //Header - Tittle  
        
        header = `
            <div class="songs-header">
                <h1 class="song-selection-title">
                    Select a song
                    <span class="badge rounded-pill bg-primary">
                        ${this.params.tag}
                    </span>
                </h1>
            </div>
        `
        const currentPage = this.songs.meta.current_page;
        const lastPage = this.songs.meta.last_page;
        const previousDisabled = currentPage < 2 ? "disabled" : "";
        const nextDisabled = currentPage => lastPage ? "disabled" : "";

        pagination = `
            <div class="song-pagination">
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item ${previousDisabled}">
                            <a class="page-link" href="/songs/${this.params.type}/${this.params.tag}/${parseInt(currentPage)-1}">Previous</a>
                        </li>
                    <li class="page-item">
                        <a class="page-link" href="#">${currentPage}</a></li>
                    <li class="page-item ${nextDisabled}">
                      <a class="page-link" href="/songs/${this.params.type}/${this.params.tag}/${parseInt(currentPage)+1}">Next</a>
                    </li>
                  </ul>
                </nav>
            </div>
        `
        
        return `
            ${header}
            ${pagination}
            <div class="row container-song">
                ${cardForEachSong}
            </div>
            ${pagination}
        `
    }

    create(){
        var app = this.parseSongs().then((result) => {
            return result;
        })
        return app 
    }


    async getHtml() {
        return this.create()
    }
}
