
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {BoardData} from './board-data';
import {Rook} from '../pieces/Rook';
import {Bishop} from '../pieces/Bishop';
import {Pawn} from '../pieces/Pawn';
import {Knight} from '../pieces/Knight';
import {King} from '../pieces/King';
import {Queen} from '../pieces/Queen';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [BoardData]
})

export class BoardPage {

  gameId:any;
  gamePlayer:any = {};
  opponentPlayer:any = {};
  lastMoveSquares:any;
  
  charObj: { [key: string]: number } = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7
  };

  constructor(private boardData:BoardData,private router: Router) {
    
  }

  public boardSize!: number;
  public squareSize!: number;
  private movement!: Movement;

  game: any;
  joinedGame:any;
  joinedGameId:any;
  myColor!: number;
  private highlightedSquare: any;
  private kingHighlightedSquare: any;
  battleTimer = 10;

  ngOnInit() {
    this.game = {};
    this.game.board = {};
    this.game.board.rows = JSON.parse(JSON.stringify(this.boardData.rows)); //Copy object
    this.movement = { position1: {x: -1, y: -1}, position2: {x: -1, y: -1} };
    this.game.turnColor = 0;//White = 0

    let clientGame = {
      "gameId":"random-123",
      "player":{
        "name":"Player1",
        "rating":"1200",
        "color":"w"
      },
      "opponent":{
        "name":"Player1",
        "rating":"1200",
        "color":"w"
      },
    };
    if(!!clientGame){
      this.gameId = clientGame.gameId;
      this.gamePlayer = clientGame.player;
      this.opponentPlayer = clientGame.opponent;
      this.myColor = 0; //White = 0
    }

    this.resize();

  }

  resize() {
    this.boardSize = Math.min(window.innerHeight-40, window.innerWidth);
    this.squareSize = this.boardSize/8;
  }


  click(x: number, y: number) {
    if (this.game.status == 2) {
      return;
    }
    setTimeout(() => {
      this.resetHighlightedSquares();
      setTimeout(() => {
          console.log("clicked square: " + this.game.board.rows[y].squares[x]);
          if(this.game.board.rows[y].squares[x].piece && this.game.board.rows[y].squares[x].piece.color == this.myColor) {
            this.startMovement(x, y);
          }else if (this.movement.position1.x != -1) {
            this.sendMovement(x, y);
          }
      },200);
    },200);

  }

  startMovement(x: number, y: number) {
    if (this.game.turnColor != this.myColor) {
      return;
    }
    let movementSquare = this.game.board.rows[y].squares[x];
    movementSquare.highlightColor= "rgb(111, 123, 124)";

    this.highlightedSquare = movementSquare;

    let movement: Movement = { position1: {x: x, y: y}, position2: {x: -1, y: -1} };

    let squares = JSON.parse(JSON.stringify(movementSquare)); //Create a copy

    let board =  JSON.parse(JSON.stringify(this.game.board)); //Create a copy

    let legalmoves = this.getLegalMoves(squares,board);
    console.log(legalmoves);
    this.processLegalMoves(legalmoves);
    
    this.movement = movement;
  }


  getLegalMoves(square:any,board:any){
    let legalmoves: any[] = [];
    if(square.piece != null){
      if(square.piece.type == 'bP' || square.piece.type == 'wP'){
        let piece:Pawn = new Pawn();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bB' || square.piece.type == 'wB'){
        let piece:Bishop = new Bishop();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bN' || square.piece.type == 'wN'){
        let piece:Knight = new Knight();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bR' || square.piece.type == 'wR'){
        let piece:Rook = new Rook();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bK' || square.piece.type == 'wK'){
        let piece:King = new King();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bQ' || square.piece.type == 'wQ'){
        let piece:Queen = new Queen();
        legalmoves = piece.generatePossibleMoves(square,board);
      }

    }
    return legalmoves;

  }

  processLegalMoves(moves: any) {

    for (let movement of moves) {
      if (this.myColor == 1) {
        movement.position.x = 7-movement.position.x;
        movement.position.y = 7-movement.position.y;
      } 
      //console.log("legal move Pos" + this.game.board.rows[movement.position.y].squares[movement.position.x].position.position);
      this.game.board.rows[movement.position.y].squares[movement.position.x].border = "8px solid black";
    }
   
  }

  resetHighlightedSquares() {
    if(this.highlightedSquare!=null){
      this.highlightedSquare.highlightColor= "";

      for (let x=0; x<=7; x++) {
        for (let y=0; y<=7; y++) {
        if(this.game.board.rows[y].squares[x].border != null){
        this.game.board.rows[y].squares[x].border = null;
        }
        }
      }
    }
  }


  sendMovement(x: number, y: number) {
    this.movement.position2.x = x;
    this.movement.position2.y = y;

    let fromSquare = JSON.parse(JSON.stringify(this.game.board.rows[this.movement.position1.y].squares[this.movement.position1.x]));
    let toSquare = JSON.parse(JSON.stringify(this.game.board.rows[this.movement.position2.y].squares[this.movement.position2.x]));

    console.log("send Move",fromSquare,toSquare);

    let moveColor = 'w';
    if(this.myColor == 1){
      moveColor = 'b';
    }

    let move = {from: fromSquare.position.pos,to: fromSquare.position.pos,color:moveColor};

    this.completeMovement(move);
  }

  completeMovement(move: any) {
    console.log("complete move from: "+ move.from + "to: "+ move.to);
    
    let fromMoveCoordinates = this.getMoveCoOrdinatesFromPosition(move.from); 
    let fromSquare = this.game.board.rows[fromMoveCoordinates.y].squares[fromMoveCoordinates.x];

    let toMoveCoordinates = this.getMoveCoOrdinatesFromPosition(move.to); 
    let toSquare = this.game.board.rows[toMoveCoordinates.y].squares[toMoveCoordinates.x];
    console.log(toSquare);

    //Validate Legal Move
    let square = JSON.parse(JSON.stringify(fromSquare)); //Create a copy
    let board =  JSON.parse(JSON.stringify(this.game.board)); //Create a copy
    let legalmoves = this.getLegalMoves(square,board);
    
    if(legalmoves.find((square)=> square.position.pos == toSquare.position.pos) == null){
      return;
    }

    //Check Game Over
    let enemyKingColor = "";
    if(move.color == "w"){
      enemyKingColor = "b";
    }else{
      enemyKingColor = "w";
    }
    let kingSquare = this.getKingSquare(enemyKingColor);
    if(kingSquare!=undefined && kingSquare.position.pos == toSquare.position.pos){
      console.log("Game Over");
      this.router.navigateByUrl('home');
    }


    //Move Piece
    let piece = fromSquare.piece;
    toSquare.piece = piece;
    fromSquare.piece = null;

    //Highlight Square after Move

    if(!!this.lastMoveSquares){
      this.lastMoveSquares.from.highlightColor = "";
      this.lastMoveSquares.to.highlightColor = "";
    }
    this.lastMoveSquares = {"from":fromSquare,"to":toSquare};

    fromSquare.highlightColor= "rgb(235, 233, 81)";
    toSquare.highlightColor= "rgb(235, 233, 81)";

    //Swap Colors After Move
    if(move.color == "w"){
      this.game.turnColor = 1;
      this.myColor = 1;
    }else{
      this.game.turnColor = 0;
      this.myColor = 0;
    }

    //Reset movement
    this.movement = { position1: {x: 0, y: 0}, position2: {x: 0, y: 0} };
    this.invertBoard(this.game.board);
  }

  getKingSquare(color: string) {
    let pieceType = color +"K";
    console.log(pieceType);
    let square;
    for (let x=0; x<=7; x++) {
      for (let y=0; y<=7; y++) {
        if(!!this.game.board.rows[y].squares[x].piece){
          if(this.game.board.rows[y].squares[x].piece.type == pieceType){
            square=this.game.board.rows[y].squares[x];
            break;
          }
        }
      }
    }

    return square;
  }

  getMoveCoOrdinatesFromPosition(position:any){
    let x1 = this.charObj[position.charAt(0)];
    let y1 = Number(position.charAt(1));;
    y1 = 8-y1;
    if (this.myColor == 1) {
      x1 = 7-x1;
      y1 = 7-y1;
    }
    
    let cordinates ={x:x1,y:y1};
    return cordinates;
  }

  invertBoard(board: any) {
    console.log("IB");
    board.rows = board.rows.slice().reverse();
    for (let row of board.rows) {
      row.squares = row.squares.slice().reverse();
    }
    return board;
  }
}

interface Movement {
  position1: Position;
  position2: Position;
}

interface Position {
  x: number;
  y: number;
}

