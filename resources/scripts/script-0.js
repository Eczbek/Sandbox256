var grid={
	width:16,
	height:16,
	leftTiles:[],
	rightTiles:[],
	refreshWait:125,
};
var tile={
	width:30,
	height:30,
	array:[],
	link:[],
	minColumnHeight:Math.ceil(grid.height/3.5),
	current:1,
	
};
var isDesert=Math.floor(Math.random()*5);
function editTile(tileId){
	if((tile.array[tileId]==0)){
		tile.array[tileId]=tile.current;
	}
	else{
		tile.array[tileId]=0;
	}
	checkTiles3();
	displayTiles();
}
function generateGrid(){
	var tileId=0;
	for(var rowNumber=0;rowNumber<grid.height;rowNumber++){
		var newRow=document.createElement("div");
		newRow.className="row";
		for(var tileNumber=0;tileNumber<grid.width;tileNumber++){
			var newTile=document.createElement("div");
			newTile.className="tile";
			newTile.id=tileId.toString();
			newTile.onmousedown=function(){
				editTile(this.id);
			};
			newRow.appendChild(newTile);
			tileId++;
		}
		document.getElementById("grid").appendChild(newRow);
	}
	for(grid.leftTiles=[];grid.leftTiles.length<grid.height;grid.leftTiles.push(grid.leftTiles.length*grid.width)){}
	for(grid.rightTiles=[];grid.rightTiles.length<grid.height;grid.rightTiles.push((grid.rightTiles.length+1)*grid.width-1)){}
}
function generateTiles(){
	for(tile.array=[];tile.array.length<grid.width*grid.height;tile.array.push(0)){
		tile.link.push(document.getElementById(tile.array.length));
	}
	for(var tileColumnNumber=0;tileColumnNumber<grid.width;tileColumnNumber++){
		for(var tileColumnHeight=0;tileColumnHeight<Math.floor(Math.random()*10+tile.minColumnHeight);tileColumnHeight++){
			var random=Math.floor(Math.random()*10+tile.minColumnHeight);
			if(tileColumnHeight<Math.floor(Math.random()*grid.height/2)){
				if(isDesert==1){
					if(Math.floor(Math.random()*3)==1){
						tile.array[grid.width*(grid.height-tileColumnHeight-1)+tileColumnNumber]=1;
					}
					else{
						if(tileColumnHeight<tile.minColumnHeight){
							tile.array[grid.width*(grid.height-tileColumnHeight-1)+tileColumnNumber]=2;
						}
						else{
							tile.array[grid.width*(grid.height-tileColumnHeight-1)+tileColumnNumber]=4;
						}
					}
				}
				else{
					tile.array[grid.width*(grid.height-tileColumnHeight-1)+tileColumnNumber]=1;
				}
			}
			else{
				if(isDesert==1){
					tile.array[grid.width*(grid.height-tileColumnHeight-1)+tileColumnNumber]=4;
				}
				else{
					tile.array[grid.width*(grid.height-tileColumnHeight-1)+tileColumnNumber]=2;
				}
			}
		}
	}
	for(var i=0;i<grid.height;i++){
		checkTiles1();
	}
	for(var i=0;i<2;i++){
		checkTiles2();
	}
	checkTiles3();
}
function checkTiles1(){
	for(var tileNumber=0;tileNumber<tile.array.length;tileNumber++){
		if((tile.array[tileNumber]!=0)&&(tile.array[tileNumber-1]==0)&&(tile.array[tileNumber+1]==0)){
			tile.array[tileNumber]=0;
		}
		if((tile.array[tileNumber]==1)&&(tile.array[tileNumber-grid.width]==0)){
			tile.array[tileNumber]=2;
		}
		if(isDesert!=1){
			if((tile.array[tileNumber]!=0)&&(tile.array[tileNumber-1]==0)&&(tile.array[tileNumber-grid.width]==2)&&(tile.array[tileNumber-grid.width-1]==0)){
				tile.array[tileNumber-1]=2;
			}
			if((tile.array[tileNumber]!=0)&&(tile.array[tileNumber+1]==0)&&(tile.array[tileNumber-grid.width]==2)&&(tile.array[tileNumber-grid.width+1]==0)){
				tile.array[tileNumber+1]=2;
			}
			if((tile.array[tileNumber]==2)&&(tile.array[tileNumber+grid.width]==0)){
				tile.array[tileNumber+grid.width]=2;
			}
		}
		else{
			if((tile.array[tileNumber]!=0)&&(tile.array[tileNumber-1]==0)&&(tile.array[tileNumber-grid.width]==4)&&(tile.array[tileNumber-grid.width-1]==0)){
				tile.array[tileNumber-1]=4;
			}
			if((tile.array[tileNumber]!=0)&&(tile.array[tileNumber+1]==0)&&(tile.array[tileNumber-grid.width]==4)&&(tile.array[tileNumber-grid.width+1]==0)){
				tile.array[tileNumber+1]=4;
			}
			if((tile.array[tileNumber]==4)&&(tile.array[tileNumber+grid.width]==0)){
				tile.array[tileNumber+grid.width]=4;
			}
			if((tile.array[tileNumber]==4)&&(tile.array[tileNumber-grid.width]==0)){
				if(Math.floor(Math.random()*grid.width)==1){
					tile.array[tileNumber-grid.width]=9;
				}
			}
			if((tile.array[tileNumber]==9)&&((tile.array[tileNumber-1]==9)||(tile.array[tileNumber+1]==9))){
				tile.array[tileNumber]=0;
			}
			if((tile.array[tileNumber]==0)&&(tile.array[tileNumber+grid.width]==9)){
				if(Math.floor(Math.random()*4)!=1){
					tile.array[tileNumber]=9;
				}
			}
		}
	}
}
function checkTiles2(){
	for(var tileNumber=0;tileNumber<tile.array.length;tileNumber++){
		if((tile.array[tileNumber]==2)&&(tile.array[tileNumber-grid.width]==0)){
			tile.array[tileNumber]=3;
		}
		if((tile.array[tileNumber]==0)&&(tile.array[tileNumber+grid.width]==3)){
			if(Math.floor(Math.random()*4)>2){
				tile.array[tileNumber]=6;
			}
		}
		if((tile.array[tileNumber]==9)&&(tile.array[tileNumber+grid.width]==0)){
			tile.array[tileNumber]=0;
		}
		if((tile.array[tileNumber]==3)&&(Math.floor(Math.random()*grid.width*2)==1)){
			tile.array[tileNumber-grid.width]=11;
			for(var treeHeight=0;treeHeight<Math.floor(Math.random()*4)+2;treeHeight++){
				var treeDirection=Math.floor(Math.random()*18);
				if(treeDirection==1){
					tile.array[tileNumber-1]=11;
					tileNumber--;
				}
				if(treeDirection==2){
					tile.array[tileNumber+1]=11;
					tileNumber++;
				}
				else{
					tile.array[tileNumber-grid.width]=11;
					tileNumber-=grid.width;
				}
			}
			for(var treeHeight=0;treeHeight<Math.floor(Math.random()*2)+1;treeHeight++){
				var treeDirection=Math.floor(Math.random()*18);
				if(treeDirection==1){
					if(tileNumber!=grid.leftTiles[Math.floor(tileNumber/grid.width)]){
						tile.array[tileNumber-1]=12;
						tileNumber--;
					}
				}
				if(treeDirection==2){
					if(tileNumber!=grid.rightTiles[Math.floor(tileNumber/grid.width)]){
						tile.array[tileNumber+1]=12;
						tileNumber++;
					}
				}
				else{
					tile.array[tileNumber-grid.width]=12;
					tileNumber-=grid.width;
				}
			}
		}
		if(tile.array[tileNumber]==0){
			if((tile.array[tileNumber-grid.width]==12)||(tile.array[tileNumber-1]==12)||(tile.array[tileNumber+1]==12)||(tile.array[tileNumber+grid.width]==12)||(tile.array[tileNumber+grid.width+1]==12)){
				if((tileNumber!=grid.rightTiles[Math.floor(tileNumber/grid.width)])&&(tileNumber!=grid.leftTiles[Math.floor(tileNumber/grid.width)])){
					tile.array[tileNumber]=10;
				}
			}
		}
		if((tile.array[tileNumber]==0)&&(Math.floor(Math.random()*5)==1)){
			if((tile.array[tileNumber-grid.width]==10)||(tile.array[tileNumber-1]==10)||(tile.array[tileNumber+1]==10)||(tile.array[tileNumber+grid.width]==10)||(tile.array[tileNumber+grid.width+1]==12)){
				if((tileNumber!=grid.rightTiles[Math.floor(tileNumber/grid.width)])&&(tileNumber!=grid.leftTiles[Math.floor(tileNumber/grid.width)])){
					tile.array[tileNumber]=10;
				}
			}
		}
		if((tile.array[tileNumber]==11)&&((tile.array[tileNumber-1]==11)||(tile.array[tileNumber+1]==11))){
			if(Math.floor(Math.random()*2)==1){
				tile.array[tileNumber]=12;
			}
			else{
				tile.array[tileNumber]=10;
			}
		}
		if(isDesert!=1){
			if((tileNumber>tile.array.length/2+grid.width)&&((tile.array[tileNumber]==0)||(tile.array[tileNumber]==6))){
				tile.array[tileNumber]=5;
			}
		}
		if((tile.array[tileNumber-1]==5)&&(tile.array[tileNumber+1]==5)){
			tile.array[tileNumber]=5;
		}
	}
}
function checkTiles3(){
	for(var tileNumber=0;tileNumber<tile.array.length;tileNumber++){
		if((tile.array[tileNumber]!=0)&&(tile.array[tileNumber+grid.width]==3)){
			tile.array[tileNumber+grid.width]=2;
		}
		if((tile.array[tileNumber]==2)&&(tile.array[tileNumber-grid.width]==6)){
			tile.array[tileNumber]=3;
		}
	}
	for(var tileNumber=0;tileNumber<tile.array.length;tileNumber++){
		if((tile.array[tileNumber]==6)&&(tile.array[tileNumber+grid.width]!=3)){
			tile.array[tileNumber]=0;
		}
		if((tile.array[tileNumber]==9)&&((tile.array[tileNumber+grid.width]==0)||(tile.array[tileNumber+grid.width]==6)||(tile.array[tileNumber+grid.width]==5))){
			tile.array[tileNumber]=0;
		}
	}
}
function displayTiles(){
	for(var tileNumber=0;tileNumber<tile.array.length;tileNumber++){
		document.getElementById(tileNumber.toString()).innerHTML="<img src=\"resources/images/tiles/tile-"+tile.array[tileNumber]+".png\" width=\""+tile.width+"\" height=\""+tile.height+"\" draggable=\"false\">";
	}
}
generateGrid();
generateTiles();
displayTiles();
function setTile(tileId){
	tile.current=tileId;
}