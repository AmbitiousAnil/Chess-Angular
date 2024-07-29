import {Rook} from './Rook';
import {Bishop} from './Bishop';

export class Queen {

    possibleMoves: any[] = [];


    generatePossibleMoves(selectedSquare:any, board:any) {

        let rook = new Rook();
        let moves = rook.generatePossibleMoves(selectedSquare,board);

        let bishop = new Bishop();
        let moves2 = bishop.generatePossibleMoves(selectedSquare,board);

        this.possibleMoves = moves.concat(moves2);
    
        return this.possibleMoves;
    }

}