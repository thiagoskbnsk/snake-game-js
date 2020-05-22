class Game {
    constructor({ context, width, height, dimension, canvas }) {
        this.context = context;
        this.defaultWidth = width;
        this.defaultHeight = height;
        this.width = width;
        this.height = height;
        this.backgroundColor = "lightgray";
        this.dimension = dimension;
        this.state = 0;
        this.score = 0;
        this.canvas = canvas;
        this.states = {
            PLAY: 0,
            PLAYING: 1,
            GAMEOVER: 2
        };
    }
    
    increaseScore() {
        this.score++;
    }

    setState(state) {
        this.state = this.getStates[state];
    }

    play() {
        this.score = 0;
        this.state = this.states.PLAYING;
    }

    gameover() {
        this.width = this.defaultWidth;
        this.height = this.defaultHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.create();
        this.state = this.states.GAMEOVER;
    }

    showPlayScreen() {
        this.context.fillStyle = "#a2f3a1";
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.font = "50px Arial";
        this.context.fillStyle = "#fff";
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        this.context.fillText("CLICK TO PLAY", this.width / 2, this.height / 2);
    }

    showGameOverScreen() {
        let record = sessionStorage.getItem("record") || 0;

        this.context.fillStyle = "#b2f7ea";
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.font = "50px Arial";
        this.context.fillStyle = "#fff";
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        this.context.fillText("GAME OVER!", this.width / 2, this.height / 2 - 50);
        this.context.fillText("CLICK TO PLAY AGAIN", this.width / 2, this.height / 2);
        this.context.font = "30px Arial";
        if (this.score > record) {
            sessionStorage.setItem("record", this.score);
            record = sessionStorage.getItem("record");
        }
        this.context.fillText(`Record: ${record}`, this.width / 2, this.height / 2 + 100);
        this.context.fillText(`Your score: ${this.score}`, this.width / 2, this.height / 2 + 130);
    }

    create() {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);

        const record = sessionStorage.getItem("record") || 0;

        this.context.font = "20px Arial";
        this.context.textBaseline = "middle";
        this.context.textAlign = "right";
        this.context.fillStyle = this.score > record ? "#6400e8" : "#fff";
        this.context.fillText(`Score: ${this.score}`, this.width - 20, 20);

        this.state === this.states.PLAY && this.showPlayScreen();
        this.state === this.states.GAMEOVER && this.showGameOverScreen();
    }

    init() {
        this.create();
    }
}
