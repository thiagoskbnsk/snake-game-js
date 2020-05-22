  class Food {
      constructor({ context, dimension, game, snake }) {
        this.context = context;
        this.dimension = dimension;   
        this.backgroundColor = 'red';
        this.game = game;
        this.positionX = Math.round(Math.random() * (game.width / dimension)) * dimension;
        this.positionY = Math.round(Math.random() * (game.height / dimension)) * dimension;
        this.snake = snake;
        this.timeout = null;
        this.time = Math.floor((Math.random() * 7) + 4) * 1000;
      }
      
      create() {
          this.context.fillStyle = this.backgroundColor;
          this.context.fillRect(this.positionX, this.positionY, this.dimension, this.dimension)
          
          this.respawnFood();
      }
      
      respawnFood() {
          if (!this.timeout) {
              this.clearTimeOut();

              this.timeout = setTimeout(() => {
                  this.positionX = Math.round(Math.random() * (this.game.width / this.dimension)) * this.dimension;
                  this.positionY = Math.round(Math.random() * (this.game.height / this.dimension)) * this.dimension;
                  this.timeout = null;
                  this.time = Math.floor((Math.random() * 7) + 4) * 1000;

                  this.game.state === this.game.states.PLAYING && this.create();
              }, this.time);
          }
      }
      
      clearTimeOut() {
          clearTimeout(this.timeout);
          this.timeout = null;
      }
      
      foodEated() {
          const { x, y } = this.snake.trail[this.snake.trail.length-1];
          
          if (x === this.positionX && y === this.positionY) {
              this.positionX = Math.round(Math.random() * (this.game.width / this.dimension)) * this.dimension;
              this.positionY = Math.round(Math.random() * (this.game.height / this.dimension)) * this.dimension;

              this.game.increaseScore();
              this.snake.increaseSize();
              
              this.create();
              this.clearTimeOut();
          }
      }
      
      init() {
          this.foodEated();
          
          this.create();
      }
  }