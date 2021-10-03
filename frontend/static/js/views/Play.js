import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Play");
        this.clientJS = [
            "/static/js/sketch.js"
        ]
    }

    create(){
        const name = this.params.name.replaceAll("%20", " ");
        const author = this.params.author.replaceAll("%20", " ");
        const imageBg = atob(this.params.imageBg);
        const imageTb = atob(this.params.imageTb);
        const audio = atob(this.params.audio);
        
        
        return `
            <div class="play-song-header row d-flex align-items-center justify-content-center h-100">
                <img src="${imageBg}" class="img-fluid" alt="song background">
                <div class="play-song-text col-md-10 intro-text text-center">
                    <h2 class="text-light fw-bold">${name}</h1>
                    <h5 class="text-light">${author}</h4>            
                </div>
                <audio class="audio-player" controls="" autoplay="auto" preload="auto" name="media" crossorigin="anonymous">
                    <source src="${audio}" type="audio/mpeg">
                </audio>
            </div>

            <div class="music-visualization-buttons">
                <button type="button" class="btn btn-outline-secondary btn-sm" onclick="decreaseBins()">
                    <img src="https://img.icons8.com/material-sharp/24/000000/zoom-in--v1.png"/>
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" onclick="increaseBins()")>

                    <img src="https://img.icons8.com/material-outlined/24/000000/zoom-out.png"/>
                </button>
            </div>

            <div id="music-visualization-canvas">
            </div>
            <h6 class="music-visualization-legend text-center">X: Audio frequencies Y: Amplitud</h6>
        `
    }

       

    async getHtml() {
        return this.create()
    }
}
