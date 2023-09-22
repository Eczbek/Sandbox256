function moveWater(){
	for(var tileNumber=0;tileNumber<tile.array.length;tileNumber++){
		if(tile.array[tileNumber]==5){
			if((tile.array[tileNumber+grid.width]==0)||(tile.array[tileNumber+grid.width]==6)){
				tile.array[tileNumber+grid.width]=7;
				tile.array[tileNumber]=0;
			}
			else{
				if(Math.floor(Math.random()*2)==1){
					if(tileNumber!=grid.rightTiles[Math.floor(tileNumber/grid.width)]){
						if((tile.array[tileNumber+1]==0)||(tile.array[tileNumber+1]==6)){
							tile.array[tileNumber+1]=7;
							tile.array[tileNumber]=0;
						}
					}
				}
				else{
					if(tileNumber!=grid.leftTiles[Math.floor(tileNumber/grid.width)]){
						if((tile.array[tileNumber-1]==0)||(tile.array[tileNumber-1]==6)){
							tile.array[tileNumber-1]=7;
							tile.array[tileNumber]=0;
						}
					}
				}
			}
		}
		if(tile.array[tileNumber]==13){
			if((tile.array[tileNumber+grid.width]==0)||(tile.array[tileNumber+grid.width]==6)){
				tile.array[tileNumber+grid.width]=14;
				tile.array[tileNumber]=0;
			}
			else{
				if(Math.floor(Math.random()*2)==1){
					if(tileNumber!=grid.rightTiles[Math.floor(tileNumber/grid.width)]){
						if((tile.array[tileNumber+1]==0)||(tile.array[tileNumber+1]==6)){
							tile.array[tileNumber+1]=14;
							tile.array[tileNumber]=0;
						}
					}
				}
				else{
					if(tileNumber!=grid.leftTiles[Math.floor(tileNumber/grid.width)]){
						if((tile.array[tileNumber-1]==0)||(tile.array[tileNumber-1]==6)){
							tile.array[tileNumber-1]=14;
							tile.array[tileNumber]=0;
						}
					}
				}
			}
		}
	}
}
function moveSand(){
	for(var tileNumber=0;tileNumber<tile.array.length;tileNumber++){
		if(tile.array[tileNumber]==4){
			if((tile.array[tileNumber+grid.width]==0)||(tile.array[tileNumber+grid.width]==6)){
				tile.array[tileNumber+grid.width]=8;
				tile.array[tileNumber]=0;
			}
			if(tile.array[tileNumber+grid.width]==5){
				tile.array[tileNumber+grid.width]=8;
				tile.array[tileNumber]=5;
			}
			if(tile.array[tileNumber+grid.width]==9){
				tile.array[tileNumber+grid.width]=8;
				tile.array[tileNumber]=0;
			}
			// if(((tile.array[tileNumber-1]==0)&&(tile.array[tileNumber+grid.width-1]==0)&&(tile.array[tileNumber+grid.width]!=0))&&((tile.array[tileNumber+1]==0)&&(tile.array[tileNumber+grid.width+1]==0)&&(tile.array[tileNumber+grid.width]!=0))){
			// 	if(Math.floor(Math.random()*2)==1){
			// 		tile.array[tileNumber+grid.width-1]=8;
			// 		tile.array[tileNumber]=0;
			// 	}
			// 	else{
			// 		tile.array[tileNumber+grid.width+1]=8;
			// 		tile.array[tileNumber]=0;
			// 	}
			// }
			// else{
			// 	if((tile.array[tileNumber-1]==0)&&(tile.array[tileNumber+grid.width-1]==0)&&(tile.array[tileNumber+grid.width]!=0)){
			// 		tile.array[tileNumber+grid.width-1]=8;
			// 		tile.array[tileNumber]=0;
			// 	}
			// 	if((tile.array[tileNumber+1]==0)&&(tile.array[tileNumber+grid.width+1]==0)&&(tile.array[tileNumber+grid.width]!=0)){
			// 		tile.array[tileNumber+grid.width+1]=8;
			// 		tile.array[tileNumber]=0;
			// 	}
			// }
		}
	}
}
function updateMovedTiles(){
	for(var tileNumber=0;tileNumber<tile.array.length;tileNumber++){
		if(tile.array[tileNumber]==7){
			tile.array[tileNumber]=5;
		}
		if(tile.array[tileNumber]==8){
			tile.array[tileNumber]=4;
		}
		if(tile.array[tileNumber]==14){
			tile.array[tileNumber]=13;
		}
	}
}
setInterval(function(){
	moveWater();
	moveSand();
	updateMovedTiles();
	checkTiles3();
	displayTiles();
	//tile.array[Math.floor(Math.random()*grid.width)]=5;
},grid.refreshWait);