//variáveis da bolinha
let xBolinha = 400;
    yBolinha = 200;
    diametro = 15;
    raio = diametro/2;
    Vx = 7;
    Vy = 7;

//variáveis da raquete
let xRaquete = 5;
    yRaquete = 155;
    altRaquete = 90;
    largRaquete = 15;
    colidiu = false;

//variáveis do oponente
let xRaquete2 = 580;
    yRaquete2 = 155;
    altRaquete2 = 90;
    largRaquete2 = 15;
    VyOponente = 3;
    chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
    pontosOponente=0;

//sons do jogo
let  raquetada
let  ponto;
let  trilha

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();  mostrarRaquete(xRaquete,yRaquete,largRaquete,altRaquete);
  mostrarRaquete(xRaquete2,yRaquete2,largRaquete2,altRaquete2);
  movimentaRaquete();
  movimentaRaqueteOponente();
  //colisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  verificaColisaoRaquete(xRaquete2,yRaquete2);
  incluirPlacar(); 
  
  
}

function mostraBolinha(){
  circle(xBolinha , yBolinha, diametro);
}

function movimentaBolinha(){  
  xBolinha += Vx;
  yBolinha += Vy;
}

function verificaColisao(){
  if(xBolinha > width - raio){
    Vx*=-1
    meusPontos+=1
    ponto.play()
  } 
  
   if(xBolinha < 0 + raio){
    Vx*=-1
    pontosOponente+=1
    ponto.play()
  }
  
   if(yBolinha > height - raio || yBolinha < 0 + raio){
    Vy*=-1
  }
}

function mostrarRaquete(x,y,larg,alt){
  rect(x, y,larg, alt);
}

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete-=5
  }
    if(keyIsDown(DOWN_ARROW)){
    yRaquete+=5
  }
}

function colisaoRaquete(){
    if(xBolinha - raio <  xRaquete + largRaquete &&
       yBolinha + raio > yRaquete &&
       yBolinha - raio < yRaquete + altRaquete){
          Vx*=-1
    }  
}

function verificaColisaoRaquete(x,y){
  
  colidiu = collideRectCircle(x, y, largRaquete, altRaquete, xBolinha, yBolinha,raio);
  if(colidiu){
    Vx*=-1
    raquetada.play()
  }
}  

function movimentaRaqueteOponente(){
  VyOponente = yBolinha-yRaquete2-altRaquete/2
  yRaquete2 += VyOponente + chanceDeErrar;
  calculaChanceDeErrar()
}

function incluirPlacar(){
  
  stroke(255)
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0))
  rect(130,10,40,30)
  fill(color(255,140,0))
  rect(430,10,40,30)
  fill(255)
  text(meusPontos,150,30)
  fill(255)
  text(pontosOponente,450,30)
}

function calculaChanceDeErrar() {
  if (pontosOponente > meusPontos) {
    chanceDeErrar += 5
    if (chanceDeErrar >= 100){
    chanceDeErrar = 100
    }
  } else {
    chanceDeErrar -= 5
    if (chanceDeErrar <= 0){
    chanceDeErrar = 0
    }
  }
}