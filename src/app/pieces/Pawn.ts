export class Pawn {

    possibleMoves: any[] = [];

    generatePossibleMoves(selectedSquare:any, board:any) {
        let row = selectedSquare.position.y;
        let column = selectedSquare.position.x;
        let myColor = selectedSquare.piece.color;

        let dx = -1;
        if(myColor == 1){
            row = 7 - row;
            column = 7 - column;
        }

        

        
        let aheadSquare = board.rows[row+dx].squares[column+0];

       // Square ahead = super.getSquare().neighbour(dx, 0);
        if (aheadSquare.piece == null) {
            this.possibleMoves.push(aheadSquare);
           /* if (row == 6 && myColor == 0) {
                let aheadsecond = board.rows[row+dx-1].squares[column+0];
                if (aheadsecond.piece == null) {
                    this.possibleMoves.push(aheadsecond);
                }
                
             } else if (row == 1 && myColor == 1) {
                let aheadsecond = board.rows[row+dx+1].squares[column+0];
                if (aheadsecond.piece == null) {
                    this.possibleMoves.push(aheadsecond);
                }
            } */
            if(row == 6){
                let aheadsecond = board.rows[row+dx-1].squares[column+0];
                if (aheadsecond.piece == null) {
                    this.possibleMoves.push(aheadsecond);
                }
            } 
        }
        let aheadLeft = board.rows[row+dx].squares[column-1];
        //Square aheadLeft = super.getSquare().neighbour(dx, -1);
        if (aheadLeft != null && aheadLeft.piece != null && (aheadLeft.piece.color != myColor)) {
            this.possibleMoves.push(aheadLeft);
        }

        let aheadRight = board.rows[row+dx].squares[column+1];
        //Square aheadRight = super.getSquare().neighbour(dx, 1);
        if (aheadRight != null && aheadRight.piece != null && (aheadRight.piece.color != myColor)) {
            this.possibleMoves.push(aheadRight);
        }

        return this.possibleMoves;
    }

}