export class Bishop {

    possibleMoves: any[] = [];


    generatePossibleMoves(selectedSquare: any, board: any) {
        let row = selectedSquare.position.y;
        let column = selectedSquare.position.x;
        let myColor = selectedSquare.piece.color;
        if(myColor == 1){
            row = 7 - row;
            column = 7 - column;
        }

        //Up Right Direction
        let offsets1 = [
            [-1, 1],
            [-2, 2],
            [-3, 3],
            [-4, 4],
            [-5, 5],
            [-6, 6]  
        ];

        //Down Right Direction
        let offsets2 = [
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
            [5, 5],
            [6, 6]  
        ];

        //Down left 
        let offsets3 = [
            [1, -1],
            [2, -2],
            [3, -3],
            [4, -4],
            [5, -5],
            [6, -6]  
        ];

        //Down right 
        let offsets4 = [
            [-1, -1],
            [-2, -2],
            [-3, -3],
            [-4, -4],
            [-5, -5],
            [-6, -6]  
        ];

        this.possibleMoves = [];

        for (let o of offsets1) {
            if(board.rows[row+o[0]] != null){
                let square = board.rows[row+o[0]].squares[column+o[1]];
                if (square != null) {
                    if (square.piece == null) {
                        this.possibleMoves.push(square);
                    } else {
                        //enemy piece
                        if (square.piece.color != myColor) {
                            this.possibleMoves.push(square);
                            break;
                        } else {
                            //own piece
                            break;
                        }
                    }
                }
            }
        }
        for (let o of offsets2) {
            if(board.rows[row+o[0]] != null){
                let square = board.rows[row+o[0]].squares[column+o[1]];
                if (square != null) {
                    if (square.piece == null) {
                        this.possibleMoves.push(square);
                    } else {
                        //enemy piece
                        if (square.piece.color != myColor) {
                            this.possibleMoves.push(square);
                            break;
                        } else {
                            //own piece
                            break;
                        }
                    }
                }
            }
        }
        for (let o of offsets3) {
            if(board.rows[row+o[0]] != null){
                let square = board.rows[row+o[0]].squares[column+o[1]];
                if (square != null) {
                    if (square.piece == null) {
                        this.possibleMoves.push(square);
                    } else {
                        //enemy piece
                        if (square.piece.color != myColor) {
                            this.possibleMoves.push(square);
                            break;
                        } else {
                            //own piece
                            break;
                        }
                    }
                }
            }
        }

        for (let o of offsets4) {
            if(board.rows[row+o[0]] != null){
                let square = board.rows[row+o[0]].squares[column+o[1]];
                if (square != null) {
                    if (square.piece == null) {
                        this.possibleMoves.push(square);
                    } else {
                        //enemy piece
                        if (square.piece.color != myColor) {
                            this.possibleMoves.push(square);
                            break;
                        } else {
                            //own piece
                            break;
                        }
                    }
                }
            }
        }

        
     /*   //all possible moves in the down positive diagonal
        for (let j = column + 1, i = row + 1; j < 8 && i < 8; j++ , i++) {
            if (board.rows[i] != null) {
                let square = board.rows[i].squares[j];

                // Square square = super.getSquare().getBoardSquare(i, j);
                if (square != null) {
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
        //all possible moves in the up positive diagonal

        for (let j = column - 1, i = row + 1; j > -1 && i < 8; j-- , i++) {
            if (board.rows[i] != null) {
                let square = board.rows[i].squares[j];

                // Square square = super.getSquare().getBoardSquare(i, j);
                if (square != null) {
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

        //all possible moves in the up negative diagonal
        for (let j = column - 1, i = row + 1; j > -1 && i > -1; j-- , i--) {
            if (board.rows[i] != null) {
                let square = board.rows[i].squares[j];

                // Square square = super.getSquare().getBoardSquare(i, j);
                if (square != null) {
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

        //all possible moves in the down negative diagonal
        for (let j = column + 1, i = row - 1; j < 8 && i > -1; j++ , i--) {

            if (board.rows[i] != null) {
                let square = board.rows[i].squares[j];

                // Square square = super.getSquare().getBoardSquare(i, j);
                if (square != null) {
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
        }*/

        return this.possibleMoves;
    } 

}