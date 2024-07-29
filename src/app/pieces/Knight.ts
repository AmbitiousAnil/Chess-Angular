export class Knight {

    possibleMoves: any[] = [];


    generatePossibleMoves(selectedSquare:any, board:any) {
        let row = selectedSquare.position.y;
        let column = selectedSquare.position.x;
        let myColor = selectedSquare.piece.color;
        if(myColor == 1){
            row = 7 - row;
            column = 7 - column;
        }

        let offsets = [
            [-2, 1],
            [-1, 2],
            [1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1]
        ];
        
        for (let o of offsets) {
            if(board.rows[row+o[0]] != null){
                let neighbourSquare = board.rows[row+o[0]].squares[column+o[1]];

                if (neighbourSquare != null && (neighbourSquare.piece == null || (neighbourSquare.piece.color != myColor))) {
                    this.possibleMoves.push(neighbourSquare);
                }
            }
        }
    
        return this.possibleMoves;
    }

}