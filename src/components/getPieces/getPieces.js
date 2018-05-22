import React from 'react';
import Piece from '../Piece/Piece';

const getPieces = (player, numberOfPieces, callerIdKey, canMove) => {

    if (player && numberOfPieces) {
        //mount up to 5 pieces
        const count = numberOfPieces > 5 ? 5 : numberOfPieces;
        //pieces array
        const pieces = [];

        //Get pieces
        for (let i = 0; i < count; i++) {
            //highlight last piece if it can move
            if (canMove && i === count -1 ){
                pieces.push(<Piece player={player} count={1} key={callerIdKey + player + 'P' + i} canMove={1}/>);
            }
            else {
                pieces.push(<Piece player={player} count={1} key={callerIdKey + player + 'P' + i} />);
            }                            
        }

        //add label to the first piece if the point has more than 5 pieces
        if (numberOfPieces > 5) {
            pieces[0] = <Piece player={player} count={numberOfPieces - 4} key={callerIdKey + player + 'P0'} />;
        }

        return pieces
    } else {
        return null;
    }
}

export default getPieces;