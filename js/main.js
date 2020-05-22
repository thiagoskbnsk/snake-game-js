const defaultParams = {
    gameWidth: 800,
    gameHeight: 800,
    snakePositionX: 48,
    snakePositionY: 48,
    dimension: 16,
};

const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    const body = document.querySelector('body');
        
    canvas.width = width;
    canvas.height = height;
    
    body.appendChild(canvas);

    return canvas;
};

const createContext = canvas => {
    const context = canvas.getContext('2d');
    
    return context;
} 

const main = () => {
    const { gameWidth, gameHeight, snakePositionX, snakePositionY, dimension } = defaultParams;

    const canvas = createCanvas(gameWidth, gameHeight);
    const context = createContext(canvas);

    const game = new Game({ 
        context,
        width: gameWidth,
        height: gameHeight,
        dimension,
        canvas
    });
    
    const snake = new Snake({
        context,
        positionX: snakePositionX,
        positionY: snakePositionY,
        dimension,
        game,
        canvas,
        movementX: dimension
    });

    const food = new Food({
        context, 
        dimension,
        game,
        snake
    });
    
    setInterval(() => {
        game.init();
        
        if (game.state === game.states.PLAYING) {
            food.init();
            snake.init();
        }
    }, 200)

    document.addEventListener('keydown', event => {
        snake.moveSnake(event.keyCode);
    });
    
    document.addEventListener('click', event => {
        if (game.state !== game.states.PLAYING) {
            game.play();
            snake.moveToRight();
        }
    })
}

window.onload = () => main();
