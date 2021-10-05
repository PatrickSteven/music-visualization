import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
        <header>
        <div id="intro" class="view">
            <div class="container-fluid d-flex align-items-center justify-content-center h-100">
                <div class="row d-flex justify-content-center text-center">
                    <div class="col-md-10 intro-text">

                            <!-- Heading -->
                            <h1 class="display-4 fw-bold text-light pt-7">Music Visualization</h1>

                            <!-- Divider -->
                            <hr class="hr-light">

                            <!-- Description -->
                            <h4 class="text-secondary my-4">Curso de Visualizacion de la Informacion</h4>

                            <!--Select Song Button --> 
                            <a href="/music" class="nav__link" data-link>
                            <button type="button" class="btn btn-outline-warning btn-lg">
                            Select your song
                            </button>
                            </a>
                    </div>
                </div>
            </div>
        </div>
        </header>
        `;
    }
}
