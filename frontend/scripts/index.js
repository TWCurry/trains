//Global vars
var imageNames=["horizontal", "vertical", "lu", "ld", "ru", "rd","lu", "ld", "ru", "rd"];
var imgs=[];
var toolboxShowing = false;
var toolboxItemSize = 50;

// Init function
$(document).ready(function(){
    grid = twoDimensionalArray(10, 10);
    gridHeight = 10;
    gridWidth = 10;
    cellSize = 50;
    var c = document.getElementById("mainCanvas");

    // Fix canvas resolution
    c.width=$('#mainCanvas').width();
    c.height=$('#mainCanvas').height();

    // Determine Grid size
    gridWidth = (Math.ceil(c.width / cellSize) * cellSize) / cellSize;
    gridHeight = (Math.ceil(c.height / cellSize) * cellSize) / cellSize;
    console.log("Width: " + c.width + " gridWidth: " + gridWidth);
    console.log("Height: " + c.height + " gridHeight: " + gridHeight);

    // Reset grid to correct size
    grid = twoDimensionalArray(gridWidth, gridHeight);

    // Fill grid with test data
    for (var y=0; y<gridHeight-1; y++) {
        for (var x=0; x<gridWidth-1; x++) {
            if (x%2==0){
            grid[x][y] = 0;
            }else{
                grid[x][y] = 1;
            }
        }
    }
    // Add event listener for mouse click
    // c.addEventListener('mousedown', function(e) {
    //     handleMouseDown(c, e);
    // })

    //Load Images
    loadImages();

    fillToolbox();

    //Loading complete
    $("#loading").fadeOut();

    // Begin main loop
    drawGrid();
});

//Function to load images into memory
function loadImages(){
    for (var i=0; i<imageNames.length; i++){
        var img = new Image();
        imgs.push(img);
        img.onload = function(){}
        img.src = `img/gameAssets/${imageNames[i]}.png`;
    }
    console.log("Image loading complete.");
}

function fillToolbox(){
    toolboxHtml = "<table id=\"toolboxTable\"><tr>";
    toolboxWidth = Math.floor($("#toolboxWorkspace").width()/toolboxItemSize);
    console.log(toolboxWidth);
    for (var i=0; i<imageNames.length; i++){
        if (i % toolboxWidth == 0){
            toolboxHtml += "</tr><tr>";
        }
        toolboxHtml += `<td><img src="img/gameAssets/${imageNames[i]}.png" height=${toolboxItemSize} width=${toolboxItemSize}></td>`;
    };
    toolboxHtml += "</tr></table>";
    $("#toolboxWorkspace").html(toolboxHtml);
}

function drawGrid(){
    // Create context
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    canvasWidth = c.width;
    canvasHeight = c.height;

    // Clear and color background
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw grid
    for (var y=0; y<gridHeight-1; y++) {
        for (var x=0; x<gridWidth-1; x++) {
            if (grid[x][y] == 0){
                ctx.drawImage(imgs[0], x*cellSize, y*cellSize, cellSize, cellSize);
            }else{
                ctx.drawImage(imgs[1], x*cellSize, y*cellSize, cellSize, cellSize);
            }
            
        }
    }

    // Create animation loop
    window.requestAnimationFrame(drawGrid);
}

// Function to create 2d Array
function twoDimensionalArray(rows, columns) {
    // Create "internal" array
    var arr = [];
  
    // Create 2nd dimension array
    for (i=0; i<rows; i++) {
       arr[i] = [];
       for (j=0; j<rows; j++) {
        arr[i][j] = null;
       }
    }
  
    return arr;
  }

  function toggleToolbox(){
      if (toolboxShowing==true){
          $("#toolbox").fadeOut(200);
          toolboxShowing = false;
      }else{
        $("#toolbox").fadeIn(200);
        toolboxShowing = true;
      }
  }