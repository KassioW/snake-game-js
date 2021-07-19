
class criarCobra {
    constructor(gameContext, gameDiv, gameBack){
      this.gameContext = gameContext;
      this.gameDiv = gameDiv;
      this.gameBack = gameBack;
      this.snakeX = 2;
      this.snakeY = this.snakeX;
      this.vel = 1;
      this.velX = this.vel;
      this.velY = 0;
      this.permision = false;
      this.snakeTrail = [{"x": this.snakeX, "y": this.snakeY}];
    }
  
    adicionarTrail(){;
  
      let i = this.snakeTrail.length - 1;
  
      for(i; i >= 0; i--){
        if (i != 0){
          this.snakeTrail[i] = this.snakeTrail[i - 1];
        }else{
          this.snakeTrail[0] = {"x": this.snakeX, "y": this.snakeY};
        }
      }
  
    }
  
    limparCobra(){
      while(this.snakeTrail.length > 1){
        this.snakeTrail.pop();
      }
    }
  
    perder(){
  
      for(let i = 0; i < this.snakeTrail.length; i++){
          
        if(i != 0 && this.snakeTrail[0].x == this.snakeTrail[i].x &&
          this.snakeTrail[0].y == this.snakeTrail[i].y){
  
            this.velX = this.velY = 0;
  
            this.gameBack.lose = true;
            this.gameBack.oldScore = this.gameBack.score; 
            this.gameBack.score = 0;
            this.limparCobra(); 
  
            document.getElementById('restart').style.display = 'block';        
  
            console.log("Você Perdeu!");
  
            return true;
        }else{
          //nada
        }        
      }
      return false;
    }
  
    empate(){
      this.moveSnake();
      this.adicionarTrail(); 
      this.perder();  
  
      for(let i = 0; i < this.snakeTrail.length; i++){
        if(i == 0){
          this.gameContext.fillStyle ='#e67422';
        }else{
          this.gameContext.fillStyle ='#43a860';
        }
        this.gameContext.fillRect(this.snakeTrail[i].x * this.gameDiv, 
          this.snakeTrail[i].y * this.gameDiv, this.gameDiv - 2, this.gameDiv - 2);
      }
    }
  
    setVel(theKeyCode){
  
      let setXY = (x, y) => {
        this.velX = x;
        this.velY = y;
      }
      if(!this.gameBack.lose){
  
        if((theKeyCode == 37 || theKeyCode == 65) && this.permision){//left
          setXY(-this.vel, 0);
          this.permision = !this.permision;
        }else if((theKeyCode == 38 || theKeyCode == 87) && !this.permision){//up
          setXY(0, -this.vel);
          this.permision = !this.permision;
        }else if((theKeyCode == 39 || theKeyCode == 68) && this.permision){//right
          setXY(this.vel, 0);
          this.permision = !this.permision;
        }else if((theKeyCode == 40 || theKeyCode == 83) && !this.permision){//down
          setXY(0, this.vel);
          this.permision = !this.permision;
        }else{
          //none
        }
  
      }else if(theKeyCode == 32){
        this.gameBack.lose = false;
        this.velX = this.vel;
        this.permision = false;
        document.getElementById('restart').style.display = 'none';
      }    
  
    }
  
    moveSnake(){
      this.snakeX += this.velX;
      this.snakeY += this.velY;
  
      if(this.snakeX > 19){
        this.snakeX = 0;
      }else if(this.snakeX < 0){
        this.snakeX = 19;
      }
  
      if(this.snakeY > 19){
        this.snakeY = 0;
      }else if(this.snakeY < 0){
        this.snakeY = 19;
      }
    }
  
  }
  
  class criarMaça {
    constructor(snake, gameContext, gameDiv, gameBack){
      this.snake = snake;
      this.gameContext = gameContext;
      this.gameDiv = gameDiv;
      this.gameBack = gameBack;
      this.appleX = 15;
      this.appleY = 15;
    }
  
    pegarMaça(){
      if(this.appleX == this.snake.snakeTrail[0].x &&
        this.appleY == this.snake.snakeTrail[0].y){
  
          this.snake.snakeTrail.push({"x": '', "y": ''});
  
          this.gameBack.score += 10;
  
          this.appleX = Math.floor(Math.random() * 20);
          this.appleY = Math.floor(Math.random() * 20);
      }else{
       
      }
    }
  
    empate(){
      this.pegarMaça();
      this.gameContext.fillStyle = '#e74c3c';
      this.gameContext.beginPath();
      this.gameContext.arc((this.appleX * this.gameDiv) + (this.gameDiv/2),
        (this.appleY * this.gameDiv) + (this.gameDiv/2), this.gameDiv/2.5, 0, 2 * Math.PI);
      this.gameContext.fill();
    }
  }
  
  class jogarDenovo {
    constructor(gameContext, gameWindow){
      this.gameContext = gameContext;
      this.gameWindow = gameWindow;
      this.score = 0;
      this.lose = false;
      this.oldScore = 0;
    }
  
    empate(){
      this.gameContext.fillStyle = '#023d16';
      this.gameContext.fillRect(0, 0, this.gameWindow.width, this.gameWindow.height);
  
      this.gameContext.fillStyle = '#fff';
      this.gameContext.font = "14px Arial";
      this.gameContext.fillText(this.score, 365, 20);
  
      if(this.lose){
        this.gameContext.fillStyle = '#fff';
        this.gameContext.font = "30px Arial";
        this.gameContext.fillText("Fim de Jogo!", 120, 150);
  
        this.gameContext.fillStyle = '#fff';
        this.gameContext.font = "20px Arial";
        this.gameContext.fillText(`Sua pontuação: ${this.oldScore}`, 130, 180);
  
        this.gameContext.fillStyle = '#fff';
        this.gameContext.font = "15px Arial";
        this.gameContext.fillText('Jogar de novo? Aperte espaço!', 100, 250);
      }
    }
  }
  
  function criarCanvas(app, width, height){
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    app.appendChild(canvas);
    return canvas;
  }
  
  function criarBotao(app){
    const div = document.createElement('div');
    div.setAttribute('class', 'buttons');
    app.appendChild(div);
  
    const up = document.createElement('button');
    up.setAttribute('type', 'button');
    up.setAttribute('id', 'up');
    up.textContent = 'UP';
    div.appendChild(up);
  
    const divSide = document.createElement('div');
    divSide.setAttribute('class', 'div-side');
    div.appendChild(divSide);
  
    const left = document.createElement('button');
    left.setAttribute('type', 'button');
    left.setAttribute('id', 'left');
    left.textContent = '< LEFT';
    divSide.appendChild(left);
  
    const restart = document.createElement('button');
    restart.setAttribute('type', 'button');
    restart.setAttribute('id', 'restart');
    restart.textContent = 'RESTART';
    divSide.appendChild(restart);
  
    const right = document.createElement('button');
    right.setAttribute('type', 'button');
    right.setAttribute('id', 'right');
    right.textContent = 'RIGHT >';
    divSide.appendChild(right);
    
    const down = document.createElement('button');
    down.setAttribute('type', 'button');
    down.setAttribute('id', 'down');
    down.textContent = 'DOWN';
    div.appendChild(down);
  
  
    return div;
  }
  
  window.onload = () => {
  
    const app = document.getElementById('root');
    const gameWindow = criarCanvas(app, 500, 500);
    const gameContext = gameWindow.getContext('2d');
    const gameDiv = 25;
  
    const voltarJogo = new jogarDenovo(gameContext, gameWindow);
    const cobra = new criarCobra (gameContext, gameDiv, voltarJogo);
    const maça = new criarMaça(cobra, gameContext, gameDiv, voltarJogo);
  
    criarBotao(app); //mobile buttons
  
    setInterval(function (){
      voltarJogo.empate();
      cobra.empate();
      maça.empate();
  
    }, 1500/13);
  
    //Controls
    document.addEventListener('keydown', () => {
      console.log(event.keyCode);
      cobra.setVel(event.keyCode);
    });
  
    //mobile
    const up = document.getElementById('up');
    up.addEventListener('click', function(){
      cobra.setVel(38);
    });
  
    const down = document.getElementById('down');
    down.addEventListener('click', function(){
      cobra.setVel(40);
    });
  
    const left = document.getElementById('left');
    left.addEventListener('click', function(){
      cobra.setVel(37);
    });
  
    const right = document.getElementById('right');
    right.addEventListener('click', function(){
      cobra.setVel(39);
    });
  
    const reiniciar = document.getElementById('reiniciar');
    reiniciar.addEventListener('click', function(){
      cobra.setVel(32);
    });
  
  
  }