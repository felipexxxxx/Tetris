/*
   Jogo: Tetris
   Autor: Code Explained (www.codeexplained.org)
   Adaptado por: Gilson Filho
*/
window.addEventListener('load', () => {
	document.body.addEventListener('click', () => {
	  let audio = new Audio('Audios/tema.mp3');
	  audio.play().catch(error => {
		console.error("Falha ao iniciar o áudio:", error);
	  });
	});
  });


// Rotina principal

const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];

const PECAS = [
    [Z, "red"],
    [S, "yellow"],
    [T, "purple"],
    [O, "green"],
    [L, "cyan"],
    [I, "blue"],
    [J, "#01FF01"]
];


var count = -1;
var nome = [];
var rank = [];
GAME();

function GAME(){
	count++
	var fimDeJogo = true;

const LINHA = 24;
const COLUNA = 12;
const TAMANHO = 20;
const VAGO = "#2E2E2E";

var peca;
var tabuleiro = [];

var inicioDescida;
var fimDeJogo = false;

var tela = document.getElementById("tela");
var c = tela.getContext("2d");

var pontos = 0;
var nivel = 1;
var linhas = 0;
var mult = nivel;
var velocidade = 1000;


var previewLine = 0;
var previewcollum = 0;
var miniboard = [];
var previewPiece1;
var previewPiece2;
var previewPiece3;

var T = Math.floor(Math.random() * PECAS.length);
var T1 = Math.floor(Math.random() * PECAS.length);
var T2 = Math.floor(Math.random() * PECAS.length);
var T3 = Math.floor(Math.random() * PECAS.length);

var aux = 0;
var rankaux;
var foraux = 0;


var I_piece = 0;
var L_piece = 0;
var O_piece = 0;
var S_piece = 0;
var T_piece = 0;
var J_piece = 0;
var Z_piece = 0;

onkeydown = controlarPeca;

iniciarTabuleiro();

desenharTabuleiro();

gerarPeca(); //primeiraPeca();

previewdraw();

inicioDescida = Date.now();

descerPeca();

// Sub-rotinas (funções)

function iniciarTabuleiro() {
	for (var i = 0; i < LINHA; i++) {
		tabuleiro[i] = [];
		
		for (var j = 0; j < COLUNA; j++) {
			tabuleiro[i][j] = VAGO;
		}
	}
}

function desenharTabuleiro(){
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
            desenharQuadrado(j, i, tabuleiro[i][j]);
        }
    }
}

function desenharQuadrado(x, y, cor){
    c.fillStyle = cor;
    c.fillRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);

    c.strokeStyle = "black";
    c.strokeRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);
}

function gerarPeca(){
	T = T1;
	T1 = T2;
	T2 = T3;
    T3 = Math.floor(Math.random() * PECAS.length);

	peca = {
		tetramino : PECAS[T][0],
		cor : PECAS[T][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 4,
		y : -2
	};

	if(T1 == 3 || T1 == 5){  // sendo 3 o quadrado e o 5 a barra
		previewPiece1 = {
			tetramino : PECAS[T1][0],
			cor : PECAS[T1][1],
			tetraminoN : 0,
			tetraminoAtivo : [[]],
			x : 1,
			y : 1
		};
	}
	else{
		previewPiece1 = {
			tetramino : PECAS[T1][0],
			cor : PECAS[T1][1],
			tetraminoN : 0,
			tetraminoAtivo : [[]],
			x : 2,
			y : 1.5
		};
	}

	if(T2 == 3 || T2 == 5){  // sendo 3 o quadrado e o 5 a barra
		previewPiece2 = {
			tetramino : PECAS[T2][0],
			cor : PECAS[T2][1],
			tetraminoN : 0,
			tetraminoAtivo : [[]],
			x : 1,
			y : 6
		};
	}
	else{
		previewPiece2 = {
			tetramino : PECAS[T2][0],
			cor : PECAS[T2][1],
			tetraminoN : 0,
			tetraminoAtivo : [[]],
			x : 2,
			y : 6.5
		};
	}

	if(T3 == 3 || T3 == 5){  // sendo 3 o quadrado e o 5 a barra
		previewPiece3 = {
			tetramino : PECAS[T3][0],
			cor : PECAS[T3][1],
			tetraminoN : 0,
			tetraminoAtivo : [[]],
			x : 1,
			y : 11
		};
	}
	else{
		previewPiece3 = {
			tetramino : PECAS[T3][0],
			cor : PECAS[T3][1],
			tetraminoN : 0,
			tetraminoAtivo : [[]],
			x : 2,
			y : 11.5
		};
	}

	if(T == 1){
		S_piece++
	}
	if(T == 2){
		T_piece++
	}
	if(T == 3){
		L_piece++
	}
	if(T == 4){
		O_piece++
	}
	if(T == 5){
		I_piece++
	}
	if(T == 6){
		J_piece++
	}
	if(T == 0){
		Z_piece++
	}

	peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];

	previewPiece1.tetraminoAtivo = previewPiece1.tetramino[previewPiece1.tetraminoN];
	previewPiece2.tetraminoAtivo = previewPiece2.tetramino[previewPiece2.tetraminoN];
	previewPiece3.tetraminoAtivo = previewPiece3.tetramino[previewPiece3.tetraminoN];
	
}

function descerPeca(){
    var agora = Date.now();
    var delta = agora - inicioDescida;
    if (delta > velocidade) {
        moverAbaixo();
        inicioDescida = Date.now();
    }
	
    if (!fimDeJogo) {
        requestAnimationFrame(descerPeca);
    }
}

function moverAbaixo(){
    if (!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.y++;
        desenharPeca();
		level();
		lines();
		pontosIniciais();
		aux = 0;

    } else {
		//random();
        travarPeca();
		previewNull();
        gerarPeca();
		
    }
    
}

function moverDireita(){
    if (!colisao(1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x++;
        desenharPeca();
    }
}

function moverEsquerda(){
    if (!colisao(-1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x--;
        desenharPeca();
    }
}

function colisao(x, y, p){
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            if (!p[i][j]) {
                continue;
            }
			
            var novoX = peca.x + j + x;
            var novoY = peca.y + i + y;
			
            if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
                return true;
            }
			
            if (novoY < 0) {
                continue;
            }
			
            if (tabuleiro[novoY][novoX] != VAGO) {
                return true;
            }
        }
    }
	
    return false;
}

function apagarPeca(){
    preencherPeca(VAGO);
}

function desenharPeca(){
    preencherPeca(peca.cor);
	previewFill1(peca.cor);
	previewFill2(peca.cor);
	previewFill3(peca.cor);
}

function preencherPeca(cor) {
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor);
            }
        }
    }
}

function travarPeca(){
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (!peca.tetraminoAtivo[i][j]) {
                continue;
            }

            if (peca.y + i < 0) {
				document.getElementById("pecaZ").innerHTML = 'Quantidade de peças vermelhas usadas: ' + Z_piece
				document.getElementById("pecaS").innerHTML = 'Quantidade de peças amarelas usadas: ' + S_piece
				document.getElementById("pecaT").innerHTML = 'Quantidade de peças roxas usadas: ' + T_piece
				document.getElementById("pecaL").innerHTML = 'Quantidade de peças cianas usadas: ' + L_piece
				document.getElementById("pecaO").innerHTML = 'Quantidade de peças verdes usadas: ' + O_piece
				document.getElementById("pecaI").innerHTML = 'Quantidade de peças azul usadas: ' + I_piece
				document.getElementById("pecaJ").innerHTML = 'Quantidade de peças verde-limão usadas: ' + J_piece
				for(foraux; foraux < 1; foraux++){
					var name = prompt("Digite seu nick de até 3 letras");
					
					while(name.length > 3){
						alert("NO MÁXIMO 3 LETRAS!");
						var name = prompt("Digite seu nick de até 3 letras");
					}

					rank[count] = pontos;
					nome[count] = name;



						if(rank[count] > rank[0]){
							rankaux = nome[count];
							nome[count] = nome[0];
							nome[0] = rankaux;

							foraux = rank[count];
							rank[count] = rank[0];
							rank[0] = foraux;


						}
						for(var teste = 0; teste<6; teste++){
							if(rank[count] >= rank[1] && rank[count] < rank[0] && count >=1){
								rankaux = nome[count];
								nome[count] = nome[1];
								nome[1] = rankaux;

								foraux = rank[count];
								rank[count] = rank[1];
								rank[1] = foraux;
							}
							if(rank[count] >= rank[2] && count >=2){
								rankaux = nome[count];
								nome[count] = nome[2];
								nome[2] = rankaux;

								foraux = rank[count];
								rank[count] = rank[2];
								rank[2] = foraux;
							}
							if(rank[count] >= rank[3] && count >=3){
								rankaux = nome[count];
								nome[count] = nome[3];
								nome[3] = rankaux;

								foraux = rank[count];
								rank[count] = rank[3];
								rank[3] = foraux;
							}
							if(rank[count] >= rank[4] && count >=4){
								rankaux = nome[count];
								nome[count] = nome[4];
								nome[4] = rankaux;

								foraux = rank[count];
								rank[count] = rank[4];
								rank[4] = foraux;
							}
						}

					ranking();
					
					console.log(count);
					
					document.getElementById("rank1").innerHTML = 'Rank 1: ' + nome[0]+" pontuação: "+rank[0];

					if(count >=1 ){
					document.getElementById("rank2").innerHTML = 'Rank 2: ' + nome[1]+" pontuação: "+rank[1];
					}
					if(count >= 2 ){
					document.getElementById("rank3").innerHTML = 'Rank 3: ' + nome[2]+" pontuação: "+rank[2];
					}
					if(count >= 3 ){
					document.getElementById("rank4").innerHTML = 'Rank 4: ' + nome[3]+" pontuação: "+rank[3];
					}
					if(count >= 4 ){
					document.getElementById("rank5").innerHTML = 'Rank 5: ' + nome[4]+" pontuação: "+rank[4];
					}
			}

				

				document.getElementById("perdeu").load();
                document.getElementById("perdeu").play();

				ShowGameOver();


                fimDeJogo = true;
				
                break;
            }
			
			
            tabuleiro[peca.y+i][peca.x+j] = peca.cor;
        }
    }

    for (var i = 0; i < LINHA; i++) {
        var linhaCheia = true;
		
        for (var j = 0; j < COLUNA; j++) {
            linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
        }
		
        if (linhaCheia) {
			document.getElementById("linha").load();
            document.getElementById("linha").play();
			
            for (var y = i; y > 1; y--) {
                for (var j = 0; j < COLUNA; j++) {
                    tabuleiro[y][j] = tabuleiro[y-1][j];
                }
            }
			
            for (var j = 0; j < COLUNA; j++) {
                tabuleiro[0][j] = VAGO;
            }
			aux++
			ctx.clearRect(0, 19, 260, 75);
			ctx.strokeText("Pontos: "+pontos,40,50);
			linesCount();
			
        }
    }

	if(aux == 1){
		pontos = pontos + (100*mult);
	}
	if(aux == 2){
		document.getElementById("duaslinhas").load();
		document.getElementById("duaslinhas").play();

		pontos = pontos + (300*mult);
	}
	if(aux == 3){
		document.getElementById("treslinhas").load();
		document.getElementById("treslinhas").play();

		pontos = pontos + (500*mult);
	}
	if(aux == 4){
		document.getElementById("quatrolinhas").load();
		document.getElementById("quatrolinhas").play();
		pontos = pontos + (800*mult);
	}
	
    desenharTabuleiro();
}

function rodarPeca(){
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
    var recuo = 0;
    
    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function controlarPeca(evento){
	var tecla = evento.keyCode;
	
    if (tecla == 37) {
		document.getElementById("moverpecamusica").load();
        document.getElementById("moverpecamusica").play();
        moverEsquerda();
        inicioDescida = Date.now();
    } else if (tecla == 38 || tecla == 90) {
		document.getElementById("z").load();
        document.getElementById("z").play();
        rodarPeca();
        inicioDescida = Date.now();
    } else if (tecla == 39) {
		document.getElementById("moverpecamusica").load();
        document.getElementById("moverpecamusica").play();
        moverDireita();
        inicioDescida = Date.now();
    } else if (tecla == 40 || tecla == 32) {
		document.getElementById("moverpecamusica").load();
        document.getElementById("moverpecamusica").play();
        moverAbaixo();
		Pontos();
    }
}

var canvasscore = document.getElementById("scoreCanvas");
var ctx = canvasscore.getContext("2d");
ctx.font = "40px Raleway";
ctx.textAling = "center";


function pontosIniciais(){
	ctx.clearRect(0, 19, 260, 75);
	ctx.strokeText("Pontos: "+pontos,40,50);
}

function Pontos(){
    ctx.clearRect(0, 19, 260, 75);
	ctx.strokeText("Pontos: "+pontos,40,50);
    pontos = pontos+(1*mult); 
}

function linesCount(){
	linhas++
}
function lines(){
	linecanvas.clearRect(0, 19, 260, 75);
	linecanvas.strokeText("linhas: "+linhas,50,50);
}

var levelCanvas = document.getElementById("LevelCanvas");
var levelcanvas = levelCanvas.getContext("2d");
levelcanvas.font = "40px Raleway";
levelcanvas.textAling = "center";

function level(){
	
	if(linhas >= 10){
		document.getElementById("nivel").load();
        document.getElementById("nivel").play();
		nivel = nivel+ 1;
		velocidade = velocidade-100;
		mult = nivel;
		linhas = linhas - 10;
	}
	levelcanvas.clearRect(0, 19, 260, 75);
	levelcanvas.strokeText("Nível: "+nivel,50,50);
}

var lineCanvas = document.getElementById("lineCanvas");
var linecanvas = lineCanvas.getContext("2d");
linecanvas.font = "40px Raleway";
linecanvas.textAling = "center";

var PreviewCanvas = document.getElementById("previewCanvas");
var previewcanvas = PreviewCanvas.getContext("2d");
previewcanvas.font = "40px Raleway";
previewcanvas.textAling = "center";

function SquareDraw(x, y, cor){
    previewcanvas.fillStyle = cor;
    previewcanvas.fillRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);

    previewcanvas.strokeStyle = "black";
    previewcanvas.strokeRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);
}



function previewdraw(){
    for(var q = 0; q < previewLine; q++) {
        for (var w = 0; w < previewcollum; w++) {
            SquareDraw(q, w, miniboard[q][w]);
        }
    }
}

function previewFill1(cor) {
    for (var q = 0; q < previewPiece1.tetraminoAtivo.length; q++) {
        for (var w = 0; w < previewPiece1.tetraminoAtivo.length; w++) {
            if (previewPiece1.tetraminoAtivo[q][w]) {
                SquareDraw(previewPiece1.x + q, previewPiece1.y + w, cor);
            }
        }
    }
}

function previewFill2(cor) {
    for (var q = 0; q < previewPiece2.tetraminoAtivo.length; q++) {
        for (var w = 0; w < previewPiece2.tetraminoAtivo.length; w++) {
            if (previewPiece2.tetraminoAtivo[q][w]) {
                SquareDraw(previewPiece2.x + q, previewPiece2.y + w, cor);
            }
        }
    }
}

function previewFill3(cor) {
    for (var q = 0; q < previewPiece3.tetraminoAtivo.length; q++) {
        for (var w = 0; w < previewPiece3.tetraminoAtivo.length; w++) {
            if (previewPiece3.tetraminoAtivo[q][w]) {
                SquareDraw(previewPiece3.x + q, previewPiece3.y + w, cor);
            }
        }
    }
}

function previewNull(){
    previewcanvas.clearRect(1, 0, 200, 750);
}

function random(){
	var T = T1;
	var T1 = Math.floor(Math.random() * PECAS.length);
}

function compareNumbers(a, b){
	return b - a;
}

function ranking(){
	rank.sort(compareNumbers);
}

}

function ShowGameOver() {
	var w = document.getElementById("CountScreen");
	var x = document.getElementById("GameOverScreen");
	var y = document.getElementById("RankingScreen");
	var z = document.getElementById("allbox");
	

	  w.style.display = "block";
	  x.style.display = "block";
	  y.style.display = "block";
	  z.style.display = "none";

}

function endgame(){
	var x = document.getElementById("CountScreen");
	var w = document.getElementById("GameOverScreen");
	var y = document.getElementById("RankingScreen");
	var z = document.getElementById("allbox");
	
	z.style.display = "block";
	w.style.display = "none";
	x.style.display = "none";
	y.style.display = "none";

	
	fimDeJogo = true;
	GAME();
	previewNull();
}
