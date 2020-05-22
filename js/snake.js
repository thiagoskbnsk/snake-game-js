class Snake {
    constructor({ context, dimension, positionX, positionY, game, canvas, movementX = 0, movementY = 0 }) {
        this.context = context
        this.dimension = dimension;  
        this.positionXStart = positionX;
        this.positionYStart = positionY;
        this.positionX = positionX;  
        this.positionY = positionY;
        this.movementX = movementX;
        this.movementY = movementY;
        this.backgroundColor = 'green'
        this.trail = [{ x: positionX, y: positionY }];
        this.size = 5;
        this.game = game;
        this.canvas = canvas;
    }
    
    increaseSize() {
        this.size++;
    }
    
    setTrail(value) {
        this.trail = [...this.trail, value];
    }
    
    update(x, y) {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(x, y, this.dimension, this.dimension);
    }

    moveToUp() {
        this.movementX = 0;
        this.movementY = -this.dimension;
    }

    moveToDown() {
        this.movementX = 0;
        this.movementY = this.dimension;
    }

    moveToRight() {
        this.movementX = this.dimension;
        this.movementY = 0;
    }

    moveToLeft() {
        this.movementX = -this.dimension;
        this.movementY = 0;
    }
    
    moveSnake(keyCode) {
        const movements = {
            37: () => this.moveToLeft(),
            38: () => this.moveToUp(),
            39: () => this.moveToRight(),           
            40: () => this.moveToDown()
        };

        const key = movements[keyCode]

        key && key();
    }
    
    live() {
        this.positionX += this.movementX;
        this.positionY += this.movementY;        
        
        this.context.fillStyle = this.backgroundColor;
        for(let i = 0; i < this.trail.length; i++) {
            const { x, y } = this.trail[i];
            this.update(x, y);
            
            if (x === this.positionX && y === this.positionY) {
                this.movementX = 0;
                this.movementY = 0;
                this.positionX = this.positionXStart;
                this.positionY = this.positionYStart;
                this.size = 5;
                this.trail = [{ x: this.positionX, y: this.positionY }]
                this.game.gameover();
            }
        }
        
        this.setTrail({x: this.positionX, y: this.positionY });   

        while(this.trail.length > this.size) {
            const filterFirstTrailItem = this.trail.filter((currentValue, index) => index !== 0);
            this.trail = filterFirstTrailItem;
        }
    }
    
    snakeHittedTheWall() {
      const tailPosition = this.trail[0];

      this.trail = this.trail.reverse();
      this.positionX = tailPosition.x;
      this.positionY = tailPosition.y;
      this.game.width = this.game.width - 57;
      this.game.height = this.game.height - 56;
      this.hitTheWall = false;
      this.canvas.width = this.game.width;
      this.canvas.height = this.game.height;
      this.game.create();
    }
    
    reverseSnake(sideHitted) {
        switch (sideHitted) {
            case 'LEFT':
                this.movementX = this.dimension;
                break;
            case 'RIGHT':
                this.movementX = -this.dimension;
                break;
            case 'TOP':
                this.movementY = this.dimension;
                break;
            case 'BOTTOM':
                this.movementY = -this.dimension;
                break;
            default:
                break;
        }
        
        this.snakeHittedTheWall();
    }
    
    wall() {
      const { positionX, positionY } = this;

      const snakeHitsVerify = {
          LEFT: positionX < 0,
          RIGHT: positionX > this.game.width - 1,
          TOP: positionY < 0,
          BOTTOM: positionY > this.game.height - 1
      };
    
      Object.keys(snakeHitsVerify).filter(currentKey => {
          return snakeHitsVerify[currentKey] && this.reverseSnake(currentKey);
      });
    }
    
    init() {
        this.live();
        this.wall();
    }
}
