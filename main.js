
var boardObject = {
  victoryMessageBoxCount:0,

// The board is represented by a 2 dimensional array. 2 dimensional array is used for scalability.
// initiall, the board is empty.
  board:[
    ['E', 'E', 'E'],
    ['E', 'E', 'E'],
    ['E', 'E', 'E'],
  ],

  // Start of noEmptyTiles Method
  // Method that checks if there's empyty tiles left on the board. A for loop inside another for loop. Checks each element inside each array.
  noEmptyTiles: function(){
    var stringOfTiles = "";
    for ( j = 0; j < this.board.length; j+= 1) {
      for ( i = 0; i < this.board[0].length; i +=1 ){
        stringOfTiles += this.board[j][i];
      }
    }
    if (stringOfTiles.search("E") === -1){
        console.log("no empty tiles");
        return true;
    } else{
      console.log("Still empty tiles");
      return false;
    }
  },
  // End of noEmptyTiles method

  // Start of check win case method
  won:false,
  checkWinCase: function(){
    var winner;
    // Check horizontal match
    for ( j = 0; j < this.board.length; j+=1 ){
      var horizontalStrike = this.board[j].join("");
      if (horizontalStrike === "XXX"){
        console.log(player1.name,"has won!");
        winner = "X";
      }
      if (horizontalStrike === "OOO"){
        console.log(player2.name,"has won!");
        winner = "O";
      }
    }
    // check vertical match - 2 loops. Innerloop checks each row in the same column. Outer loop interates for every column
    for ( i = 0; i < this.board.length; i+=1 ){
      var verticalStrike = "";
      for ( j = 0; j < this.board.length; j+=1 ){
        verticalStrike = verticalStrike + this.board[j][i];
      }
      if (verticalStrike === "XXX"){
        console.log(player1.name,"has won!");
        winner = "X";
      }
      if (verticalStrike === "OOO"){
        console.log(player2.name,"has won!");
        winner = "O";
      }
    }
    var diagonalOne = "";
    var diagonalTwo = "";
    // check diagonal match - left top to right bottom
    for (j = 0, i = 0; j<this.board.length; j++, i++){

      diagonalOne = diagonalOne + this.board[j][i];
      if (diagonalOne === "XXX"){
        console.log(player1.name,"has won!");
        winner = "X";
      }
      if (diagonalOne === "OOO"){
        console.log(player2.name,"has won!");
        winner = "O";
      }
    }
    // check diagonal match - right top to left bottom
    for (j = 0, i = this.board.length -1; j<this.board.length; j++, i--){
      diagonalTwo = diagonalTwo + this.board[j][i];
      if (diagonalTwo === "XXX"){
        console.log(player1.name,"has won!");
        winner = "X";
      }
      if (diagonalTwo === "OOO"){
        console.log(player2.name,"has won!");
        winner = "O";
      }
    }
    if (winner ==="X" || winner ==="O" ){
      this.won = true;
      return winner;
    }
    return false;
  },
  // End of check win case method

  currentPlayer:"X",
  whoseTurn: function(){
    if (this.won === true){
      return true;
    }
    if (this.currentPlayer === "X"){
      console.log("It's",player1.name+"'s turn!'");
    } else if (this.currentPlayer === "O"){
      console.log("It's",player2.name+"'s turn!'");
    } else {

    }
    return;
  },


  // Start of advance turn
  advanceTurn: function(){
    if (this.won === true){
      return true;
    }
    if (this.currentPlayer ==="X"){
      this.currentPlayer = "O";
    } else if (this.currentPlayer ==="O"){
      this.currentPlayer = "X";
    } else {

    }
    return;
  },

  // end of advance turn

  // Start of reset Game

  resetGame: function () {
    this.board =[
      ['E', 'E', 'E'],
      ['E', 'E', 'E'],
      ['E', 'E', 'E'],
    ];
    console.log(this);
    //this.currentPlayer = "X";
    preventScoreAfterVictory = 1;
    this.won = false;
    $(".boardContainer p").remove();
    $(".boardContainer td img").remove();
    $(".boardContainer td").data("filled","no");
    this.victoryMessageBoxCount = 0;
    this.currentPlayer="X";

  },
};

// Start of score counter object

var scoreBoard = {
  player1:0,
  player2:0,
  ai:0,
  addWin: function(player){
    var winningPlayer = player;
    if (winningPlayer === "X"){
      this.player1 += 1;
    } else if (winningPlayer ==="O"){
      this.player2 += 1;
    } else if (winningPlayer === "ai"){
      this.ai += 1;
    } else {}
    return player;
  },
};

// End of score counter ojbect

var preventScoreAfterVictory = 1;
var playerFactory = function(nameIn,symbolIn) {
  playerObject = {
    name:nameIn,
    symbol:symbolIn,
    makeMove:function(rowIn,colIn){
      boardObject.board[rowIn][colIn] = this.symbol;
      var noMoreRoom = boardObject.noEmptyTiles();
      var winner = boardObject.checkWinCase();
      scoreBoard.addWin(winner);
      // if statement to check if theres a winner or not. If there is, whether the winner is player 1 "X" or player 2 "O".
      if ( (winner !== false) ||  noMoreRoom){
        var $victoryMessageBox = $("<div></div>").addClass("victory");
        $victoryMessageBox.css({
          // "width":"40vw",
          // "height":"45vh",
          // "background":"rgba(0,0,0,0.5)",
          // "zIndex":"99999999",
          // "position":"fixed",
          // "top":"28%",
          // "left":"30%",
          // "font-size":"60px",
          // "color":"white",
          // "padding-top":"1em",
        });
        if (winner !== false){
          if (winner === "X"){
            $victoryMessageBox.html("Player 1 Wins");
          }
          if (winner === "O"){
            $victoryMessageBox.html("Player 2 Wins");
          }
      } else {
        $victoryMessageBox.html("It's a Draw");
      }

      if (boardObject.victoryMessageBoxCount === 0){
        $("body").append($victoryMessageBox);

        // Start - restart button - button inside victory / draw popup box-sizing
        // Note - javascript - higher priority. Css styling defined here cannot be overwritten by css.
        var $restartButton = $("<div></div>").addClass("restartButton");
        $restartButton.html("Play Again");

        $("div.victory").append($restartButton);
        boardObject.victoryMessageBoxCount = 1;
      }
      if (boardObject.won && (preventScoreAfterVictory===1) ){
        $("#playerOneScore").html(scoreBoard.player1);
        $("#playerTwoScore").html(scoreBoard.player2);
        preventScoreAfterVictory =0;
      }

        // End - restart button
      }
      boardObject.advanceTurn();
      boardObject.whoseTurn();
    },
  };
  return playerObject;
};

var onClickMakeMove = function () {
  var classOfTileClicked = $(this).attr("class");
  //if ($(this).children().length ===1){
  if ($(this).data("filled") !== "yes"){

  if ( (classOfTileClicked === "tile1") && (boardObject.currentPlayer === "X") ){
  player1.makeMove(0,0);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile2") && (boardObject.currentPlayer === "X") ){
  player1.makeMove(0,1);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile3") && (boardObject.currentPlayer === "X") ){
  player1.makeMove(0,2);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile4") && (boardObject.currentPlayer === "X") ){
  player1.makeMove(1,0);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile5") && (boardObject.currentPlayer === "X") ){
  player1.makeMove(1,1);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile6") && (boardObject.currentPlayer === "X")){
  player1.makeMove(1,2);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile7") && (boardObject.currentPlayer === "X") ){
  player1.makeMove(2,0);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile8") && (boardObject.currentPlayer === "X") ){
  player1.makeMove(2,1);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile9") && (boardObject.currentPlayer === "X") ){
  player1.makeMove(2,2);
      $(this).data("filled","yes");
  return;
  }
  // For player 2
  if ( (classOfTileClicked === "tile1") && (boardObject.currentPlayer === "O") ){
  player2.makeMove(0,0);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile2") && (boardObject.currentPlayer === "O") ){
  player2.makeMove(0,1);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile3") && (boardObject.currentPlayer === "O") ){
  player2.makeMove(0,2);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile4") && (boardObject.currentPlayer === "O") ){
  player2.makeMove(1,0);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile5") && (boardObject.currentPlayer === "O") ){
  player2.makeMove(1,1);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile6") && (boardObject.currentPlayer === "O")){
  player2.makeMove(1,2);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile7") && (boardObject.currentPlayer === "O") ){
  player2.makeMove(2,0);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile8") && (boardObject.currentPlayer === "O") ){
  player2.makeMove(2,1);
      $(this).data("filled","yes");
  return;
  }
  if ( (classOfTileClicked === "tile9") && (boardObject.currentPlayer === "O") ){
  player2.makeMove(2,2);
      $(this).data("filled","yes");
  return;
  }
}
};

var putSymbolIn = function(){
  // var $nodeX = $("<p>X</p>");
  if (boardObject.won === true){
    console.log("Game has ended");
    return;
  }
  if ( (boardObject.currentPlayer === "X") && ( $(this).data("filled")!=="yes" ) ){
    //$(this).append("<p>X</p>");

    $(this).append(playerOneSigil);
  }
  else if ( (boardObject.currentPlayer === "O") && ( $(this).data("filled")!=="yes" ) ){
    //$(this).append("<p>O</p>");
    $(this).append(playerTwoSigil);

  }
};


var player1 = new playerFactory("Steve","X");
var player2 = new playerFactory("Jim","O");
boardObject.whoseTurn();
$(".boardContainer td").on("click",putSymbolIn);
$(".boardContainer td").on("click",onClickMakeMove);

var onClickResetGame = function (){
  boardObject.resetGame();
};
$("#reset").on("click",onClickResetGame);

// Create a jQuery node of the side menu
var $asideMenu = $("aside");

// Create callback function
var moveSideMenuCenter = function(){
  $asideMenu.toggleClass("asideClicked");
};

$asideMenu.on("click",moveSideMenuCenter);

// $asideMenu.on("click", function() {
  // this will be the dom element
  // $(this) will be the jquery wrapped
  // moveSideMenuCenter("arg");
// })

var $enterName = $("options");
var expandEnterName = function (){
  $enterName.animate({
    width:"400px",
    height:"200px",
    bottom:"300px"
  },2000);
};
$enterName.on("click",expandEnterName);


// Start - Victory / Draw restart

var removeBox = function (){
  boardObject.resetGame();
};
$("body").on("click",".restartButton", removeBox);

// remove the button when restart button clicked
$("body").on("click",".restartButton", function(){
  $(this).remove();
});
// remove the victory / draw message box when restart button clicked
$("body").on("click",".victory", function(){
  $(this).remove();
});

// End - Victory / Draw restart

// Start - update name and score with jQuery

$playerOneName = $("#playerOneName");
$playerOneScore = $("#playerOneScore");

$playerTwoName = $("#playerTwoName");
$playerTwoScore = $("#playerTwoScore");



// End - update name and score with jQuery


// Music Related javascript

var musicObject = {
  stannis:'<iframe width="200" height="113" src="https://www.youtube-nocookie.com/embed/9szldJEzD5U?rel=0&amp?rel=0&autoplay=1 ;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>',
};

// $musicJQNode = $()
// $(body).on("load",musicObject.stannis).append();


// House sigils

var sigils = {
  playerOneSelect:1,
  playerTwoSelect:0,
  baratheon:"<img src='images/baratheon.png'>",
  lannister:"<img src='images/lannister.png'>",
  stark:"<img src='images/stark.png'>",
  tyrell:"<img src='images/tyrell.png'>",
  greyjoy:"<img src='images/greyjoy.png'>",
  targ:"<img src='images/targ.png'>",
};


    console.log("this thing ran");


var playerOneSigil = sigils.stark;
var playerTwoSigil = sigils.lannister;

$(".stark").on("click",function(){
  if (sigils.playerOneSelect === 1 ){
    playerOneSigil = sigils.stark;
    sigils.playerOneSelect = 0;
    sigils.playerTwoSelect = 1;
    $("#playerSelectHouse").html("Player 2 Select House");
    return;
  }
  if (sigils.playerTwoSelect === 1){
    playerTwoSigil = sigils.stark;
    sigils.playerTwoSelect = 0;
    sigils.playerOneSelect=1;
    $("#playerSelectHouse").html("Player 1 Select House");
    $(".houseContainer").toggleClass("houseToggleOff");
    return;
  }
});
$(".lannister").on("click",function(){
  if (sigils.playerOneSelect === 1 ){
    playerOneSigil = sigils.lannister;
    sigils.playerOneSelect = 0;
    sigils.playerTwoSelect = 1;
    $("#playerSelectHouse").html("Player 2 Select House");
    return;
  }
  if (sigils.playerTwoSelect === 1){
    playerTwoSigil = sigils.lannister;
    sigils.playerTwoSelect = 0;
    sigils.playerOneSelect =1;
    console.log("Did this ran?");
    $("#playerSelectHouse").html("Player 1 Select House");
    $(".houseContainer").toggleClass("houseToggleOff");
    return;
  }
});
$(".baratheon").on("click",function(){
  if (sigils.playerOneSelect === 1 ){
    playerOneSigil = sigils.baratheon;
    sigils.playerOneSelect = 0;
    sigils.playerTwoSelect = 1;
    $("#playerSelectHouse").html("Player 2 Select House");
    return;
  }
  if (sigils.playerTwoSelect === 1){
    playerTwoSigil = sigils.baratheon;
    sigils.playerTwoSelect = 0;
    sigils.playerOneSelect=1;
    $("#playerSelectHouse").html("Player 1 Select House");
    $(".houseContainer").toggleClass("houseToggleOff");
    return;
  }
});
$(".tyrell").on("click",function(){
  if (sigils.playerOneSelect === 1 ){
    playerOneSigil = sigils.tyrell;
    sigils.playerOneSelect = 0;
    sigils.playerTwoSelect = 1;
    $("#playerSelectHouse").html("Player 2 Select House");
    return;
  }
  if (sigils.playerTwoSelect === 1){
    playerTwoSigil = sigils.tyrell;
    sigils.playerTwoSelect = 0;
    sigils.playerOneSelect=1;
    $("#playerSelectHouse").html("Player 1 Select House");
    $(".houseContainer").toggleClass("houseToggleOff");
    return;
  }
});
$(".greyjoy").on("click",function(){
  if (sigils.playerOneSelect === 1 ){
    playerOneSigil = sigils.greyjoy;
    sigils.playerOneSelect = 0;
    sigils.playerTwoSelect = 1;
    $("#playerSelectHouse").html("Player 2 Select House");
    return;
  }
  if (sigils.playerTwoSelect === 1){
    playerTwoSigil = sigils.greyjoy;
    sigils.playerTwoSelect = 0;
    sigils.playerOneSelect=1;
    $("#playerSelectHouse").html("Player 1 Select House");
    $(".houseContainer").toggleClass("houseToggleOff");
    return;
  }
});
$(".targ").on("click",function(){
  if (sigils.playerOneSelect === 1 ){
    playerOneSigil = sigils.targ;
    sigils.playerOneSelect = 0;
    sigils.playerTwoSelect = 1;
    $("#playerSelectHouse").html("Player 2 Select House");
    return;
  }
  if (sigils.playerTwoSelect === 1){
    playerTwoSigil = sigils.targ;
    sigils.playerTwoSelect = 0;
    sigils.playerOneSelect=1;
    $("#playerSelectHouse").html("Player 1 Select House");
    $(".houseContainer").toggleClass("houseToggleOff");
    return;
  }
});
$(".houseContainer div").on("click",boardObject.resetGame);
var environment = {
  battleOnIce:"../images/battleOnIce.jpg",
  throneRoom:"../images/castleThrone",
};
$(".environment1").on("click", function(){
  $("body").css({
    "backgroundImage":"url('images/battleOnIce.jpg')"
  });
});
$(".environment2").on("click", function(){
  $("body").css({
    "backgroundImage":"url('images/theWall.jpg')"
  });
});
$(".environment3").on("click", function(){
  $("body").css({
    "backgroundImage":"url('images/kingsLanding.jpg')"
  });
});

$("#location").on("click",function(){
  $(".environmentContainer").toggleClass("environmentToggleOff");
});

$("#house").on("click", function(){
  $(".houseContainer").toggleClass("houseToggleOff");
});
