export class Rook {

    possibleMoves: any[] = [];

    generatePossibleMoves(selectedSquare:any, board:any) {
        let row = selectedSquare.position.y;
        let column = selectedSquare.position.x;
        let myColor = selectedSquare.piece.color;
        
        if(myColor == 1){
            row = 7 - row;
            column = 7 - column;
        }

        this.possibleMoves = [];

        //all possible moves in the up
        for (let i = row + 1; i < 8; i++) {
            if(board.rows[i]!=null){
                let square = board.rows[i].squares[column];
                if(square != null){
                    if (square.piece == null) {
                        this.possibleMoves.push(square);
                    } else if (square.piece.color != myColor) {
                        this.possibleMoves.push(square);
                        break;
                    } else {
                        break;
                    }
                }
            }
        }


         //all possible moves in the down
        for (let i = row - 1; i > -1; i--) {
            if(board.rows[i]!=null){
                let square = board.rows[i].squares[column];
                if(square != null){
                    if (square.piece == null) {
                        this.possibleMoves.push(square);
                    } else if (square.piece.color != myColor) {
                        this.possibleMoves.push(square);
                        break;
                    } else {
                        break;
                    }
                }
            }
        }

        //all possible moves to the right
        for (let i = column + 1; i < 8; i++) {
            if(board.rows[row]!=null){
                let square = board.rows[row].squares[i];
                if(square != null){
                    if (square.piece == null) {
                        this.possibleMoves.push(square);
                    } else if (square.piece.color != myColor) {
                        this.possibleMoves.push(square);
                        break;
                    } else {
                        break;
                    }
                }
            }
        }

        //all possible moves to the left
        for (let i = column - 1; i > -1; i--) {
            
            if(board.rows[row]!=null){
                let square = board.rows[row].squares[i];
                if(square != null){
                    if (square.piece == null) {
                        this.possibleMoves.push(square);
                    } else if (square.piece.color != myColor) {
                        this.possibleMoves.push(square);
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    
        return this.possibleMoves;
    }

}