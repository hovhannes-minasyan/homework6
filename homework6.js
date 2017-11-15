// JS
const canvas = document.getElementById("canvas");
const margin = 2;
const cellSize =200;
const rect = canvas.getBoundingClientRect();
const context = canvas.getContext('2d');
let score = 0;
const Score = document.getElementById("score");
const field = [
["","",""],
["","",""],
["","",""]
];

const isTheGameOver = function()
{
	
	for(let i = 0;i<3;i++)
		for(let j = 0;j<3;j++)
			if(!field[i][j]) return false; 
	
	return true;
}

const copy2Dimension = function(arr1,arr2)
{
	for(let i = 0;i<arr1.length;i++)
		for(let j = 0;j<arr1[i].length;j++)
			arr1[i][j]=arr2[i][j];
}
const drawSymbol = function(coorX,coorY,sign)
{	
/*
	if(sign) context.drawImage(xImg,coorX*202,coorY*202,200,200);
	else context.drawImage(oImg,coorX*202,coorY*202,200,200);
	*/
	if(!sign) context.fillStyle="red";
	else context.fillStyle = "yellow";
	
	context.fillRect(coorX*(margin+cellSize),coorY*(margin+cellSize),cellSize,cellSize);
}

const rand = function(num) {
	return Math.floor(Math.random() * num);
};

function diamond(n,str) {
	n-=1-(n%2);
	let line="";
	for(let i = 0;i<(n+1)/2;i++)
	{
		for(let j=0;j<(n-1)/2-i;j++) //Prabel
		{
			line+=" ";
		}
		for(let j=0;j<i*2+1;j++) // Nshan
		{
			line+=str;
		}
		console.log(line);
		line = "";
	}
	for(let i = 0;i<(n-1)/2;i++)
	{
		for(let j=0;j<i+1;j++) //Prabel
		{
			line+=" ";
		}
		for(let j=0;j<n-2*i-2;j++) // Nshan
		{
			line+=str;
		}
		console.log(line);
		line = "";
	}
}
 
function diamondRecursion (height,str)
{
	height-=1-(height%2);
	const spaceStar = function(n,m)
	{
		if(n<=0 && m<=0) return "";
		if(n===0) return spaceStar(n,m-1)+str;
		return " " + spaceStar(n-1,m);
	}
	const helper1 = function(n,m)
	{
		if(n<=0) return;
		console.log(spaceStar(n,m));
		helper1(n-1,m+2);
	}
	const helper2 = function(n,m)
	{
		if(m<=0) return;
		console.log(spaceStar(n,m));
		helper2(n+1,m-2);
	}
	helper1((height-1)/2,1);
	helper2(0,height);
}


const nextMove = function (field,p,moveCount){
	 
	if(field[1][1] === "") return [1,1];
	if(moveCount<3) {
		while(true){
		let index1 = rand(2)*2;
		let index2 = rand(2)*2;		
		if(!field[index1][index2]) return [index1,index2]; 
			}
	}
	let xCounter = 0;
	let oCounter = 0;
	const oes=[
	[0,0,0,],
	[0,0,0,],
	[0,0]
	];
	const xes = [
	[0,0,0,],
	[0,0,0,],
	[0,0]
	];
	
	for(let i = 0;i<3;i++)
		for(let j = 0;j<3;j++)
		{
			if(field[i][j] === "x") {
				xCounter++;
				xes[0][i]++;
				xes[1][j]++;
				if(i===j) xes[2][0]++;
				if(i+j===2) xes[2][1]++;
				}
			else if(field[i][j] === "o") {
				oCounter++;
				oes[0][i]++;
				oes[1][j]++;
				if(i===j) oes[2][0]++;
				if(i+j===2) oes[2][1]++;
			}
		}
	if(xCounter + oCounter >= 9)  return 0;
	let player,opponent;
	if(p){player = xes; opponent=oes;}
	else {player = oes; opponent=xes;}
	//console.log("player");
	//console.log(player);
	//console.log("opponent");
	//console.log(opponent);
	let i =0;
	let j =0;
	let check = false;
	for(i = 0; i< player.length;i++)
	{
		for(j=0;j<player[i].length;j++)
		{
			if(player[i][j]===2 && opponent[i][j]===0){check=true; break;}//
		}
		if(check) break;
	}
	if(!check)
		for(i = 0; i< opponent.length;i++)
		{
			for(j=0;j<opponent[i].length;j++)
			{
				if(player[i][j]===0 && opponent[i][j]===2){check=true; break;}//
			}
			if(check) break;
		}
	//console.log("i="+i+" j="+j)
	if(check) 
	{
		 if(i===0)
		 {
			for(let k = 0;k<3;k++)
			{
				if(!field[j][k]) return [j,k];
			}				
		 }
		 else if(i===1)
		 {
			 for(let k = 0;k<3;k++)
			{
				if(!field[k][j]) return [k,j];
			}		
		 }
		 else if(j===0)
		 {
			if(!field[0][0] ) {return [0,0]}
			if(!field[2][2]) {return [2,2]} 
			
		 }
		 else if (j===1)
		 {
			 if(!field[0][2]) {return [0,2]} 
			 if(!field[2][0]) {return [2,0]}
		 }
	}
	//console.log(field);
	//console.log(xes);
	//console.log(oes);
	
	console.log("count = "+moveCount);
	if(moveCount===3)
	{
		console.log(xes[2][0]+xes[2][1]+oes[2][0]+oes[2][1])
		if(field[1][1]==="x")
		{
			while(true)
			{
				let index1 = rand(2)*2;
				let index2 = rand(2)*2;
				if(field[index1][index2]==="") return [index1,index2];
			}
		}
		else if(xes[2][0]+xes[2][1] <=1 && xes[0][1] && xes[1][1])
		{
			let row = -1;
			let col = -1;
			for(let rep = 0;rep<2;rep++)
			for(let t = 0; t<3;t++)
			{
				for(let y=0;y<3;y++)
				{
					if(field[t][y]==="x")
					{
						if(t===1 && col===-1) col = y;
						if(y===1 && row===-1) row=t;	
						if(t!==1 && y!==1 && row ===-1 && col !==-1) row = t;
						if(t!==1 && y!==1 && col ===-1 && row !==-1) col = y;
					}
				}
			}
			//alert(row + " " +col)
			return [row,col];
		}
	}
	
	for(let l=0;l<50;l++)
	{
		const index1 = rand(3);
		const index2 = rand(3);
		if(index1+index2 % 2 ===0) continue;
		if(field[index1][index2]==="") return [index1,index2]; 
	}
	while(true)
	{
		const index1 = rand(3);
		const index2 = rand(3);
		if(field[index1][index2]==="") return [index1,index2];
	}
}

function makeMove (player,move) {
	if(field[move[0]][move[1]]!=="") return -1;
	if(player) field[move[0]][move[1]]="x";
	else field[move[0]][move[1]]="o";
	
	for(let i = 0; i<3;i++) if(field[i][0]===field[i][1] && field[i][0]===field[i][2] && field[i][0]!=="") return {points : [[i,0],[i,1],[i,2]],winner : player};
	for(let i = 0; i<3;i++) if(field[0][i]===field[1][i] && field[0][i]===field[2][i] && field[0][i]!=="") return {points : [[0,i],[1,i],[2,i]],winner : player};
	if(field[0][0]===field[1][1] && field[1][1]===field[2][2] && field[1][1]!=="") return {points : [[0,0],[1,1],[2,2]],winner : player};
	if(field[0][2]===field[1][1] && field[1][1]===field[2][0]&& field[1][1]!=="") return {points : [[0,2],[1,1],[2,0]],winner : player};
	
	return 1;
}

let player;
let turn;
let pcVSpc
const start = function (isX,noPlayer)
{
	pcVSpc=noPlayer;
	player = !!isX;
	//if(rand(2)) player = false;
	turn=0;
	context.clearRect(0,0,canvas.width,canvas.height);
	context.fillStyle="white";
	context.fillRect(cellSize,0,margin,3*cellSize+2*margin);
	context.fillRect(2*cellSize+margin,0,margin,3*cellSize+2*margin);
	context.fillRect(0,cellSize,3*cellSize+2*margin,margin);
	context.fillRect(0,2*cellSize+margin,3*cellSize+2*margin,margin);
	
	for(let i = 0;i<3;i++)
		for(let j = 0;j<3;j++)field[i][j]="";
	
	
	if(!player){ 
		makeMove(!player,[1,1]);
		drawSymbol(1,1,!player)
		turn+=2;
	}
	if(noPlayer)
	{
		if(!player) turn--;
		while (turn<9)
		{
			pcMove = nextMove(field,!player,turn);
			//setTimeout(function(){playTheGame(pcMove[1],pcMove[0])},timer)
			console.log(pcMove);
			playTheGame(pcMove[1],pcMove[0]);
			//setTimeout(function(){playTheGame(pcMove[1],pcMove[0]) },0);;
			
		}
	}
	
}

function callItDraw ()
{
	turn=9;
	
	setTimeout(function(){	if(confirm("You ended the game in a draw. \nDo you want to play again?")) start(!player,pcVSpc)},10)
	//if(confirm("You ended the game in a draw. \nDo you want to play again?")) start(!player,pcVSpc)
}
function callItLoss (sign)
{
	turn=9;
	score++;
	Score.innerHTML="0 - "+score;
	let p = "Red";
	if(!sign) p = "Yello";
	
	//if(confirm("Your mistakes are your mistakes, nobody cares. \nThe winner is"+p+" \nDo you want to play again?")) start(!player,pcVSpc)
	setTimeout(function(){	if(confirm("Your mistakes are your mistakes, nobody cares. \nThe winner is"+p+" \nDo you want to play again?"))  start(!player,pcVSpc)},10)
}

canvas.addEventListener('click', function(event) {
	
	const x = Math.floor((event.pageX-rect.left)/202);
	const y = Math.floor((event.pageY-rect.top)/202);
	//console.log("x="+x+ " y="+y)
	playTheGame(x,y)
	
})


function playTheGame(x,y)
{
	if(makeMove(player,[y,x])>0) 
	{
		drawSymbol(x,y,player);
		
		if(isTheGameOver())
		{
			callItDraw()
			//console.log("Ended")
			setTimeout(function(){  }, 10);;
			return;
		}
		turn++;
		const pcMove = nextMove(field,!player,turn);
		
		const pcWon=makeMove(!player,pcMove);
		turn++;
		drawSymbol(pcMove[1],pcMove[0],!player);
		
		if(isTheGameOver())
		{
			callItDraw();
			//setTimeout(function(){ callItDraw() }, 10);;
			return;
		}
		else if(pcWon!==1)
		{
			const p1 = pcWon.points[0];
			const p2 = pcWon.points[2];
			context.lineWidth = 5;
			context.strokeStyle = "blue";
			context.beginPath();
			context.moveTo(p1[1]*cellSize+margin+cellSize/2,p1[0]*(cellSize+margin)+cellSize/2);
			context.lineTo((p2[1])*cellSize+margin+cellSize/2,(p2[0])*cellSize+margin+cellSize/2);
			context.stroke();
			callItLoss(player)
			
		}
		
	}
}


start(true,true);