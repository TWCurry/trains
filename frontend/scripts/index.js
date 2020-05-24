//Global vars
var imageNames=["horizontal", "vertical", "lu", "ld", "ru", "rd", "grass", "path", "house1"];
var imgs=[];
var toolboxShowing = false;
var toolboxItemSize = 50;
var selectedItem = "";
var toolboxItemSelected = false;
var mouseCoords = {};

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

    // Fill grid grass
    for (var y=0; y<gridHeight-1; y++) {
        for (var x=0; x<gridWidth-1; x++) {
            grid[x][y] = "grass";
        }
    }
    // Add event listeners for mouse stuff
    c.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(c, evt);
        mouseCoords = mousePos;
      }, false);

    c.addEventListener('mousedown', function(e) {
        handleMouseDown(c, e);
    })

    //Load Images
    loadImages();

    fillToolbox();

    //Loading complete
    $("#loading").fadeOut();

    // Begin main loop
    drawToCanvas();
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
    for (var i=0; i<imageNames.length; i++){
        if (i % toolboxWidth == 0){
            toolboxHtml += "</tr><tr>";
        }
        toolboxHtml += `<td><input type="image" src="img/gameAssets/${imageNames[i]}.png" height=${toolboxItemSize} width=${toolboxItemSize} onclick="selectObject('${imageNames[i]}')"></td>`;
    };
    toolboxHtml += "</tr></table>";
    $("#toolboxWorkspace").html(toolboxHtml);
}

function drawToCanvas(){
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
            var imageIndex = imageNames.findIndex(i => i === grid[x][y]);
            ctx.drawImage(imgs[imageIndex], x*cellSize, y*cellSize, cellSize, cellSize);
        }
    }

    //Draw toolbox object
    if (toolboxItemSelected == true){
        var imageIndex = imageNames.findIndex(i => i === selectedItem);
        ctx.drawImage(imgs[imageIndex], mouseCoords["x"]-(cellSize/2), mouseCoords["y"]-(cellSize/2), cellSize, cellSize);
    }

    // Create animation loop
    window.requestAnimationFrame(drawToCanvas);
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

function selectObject(item){
    selectedItem = item;
    $("#toolbox").hide();
    toolboxShowing = false;
    toolboxItemSelected = true;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function handleMouseDown(c, e){
    if (toolboxItemSelected == true){
        grid[Math.floor(mouseCoords["x"]/cellSize)][Math.floor(mouseCoords["y"]/cellSize)] = selectedItem;
        // toolboxItemSelected = false;
    }
}