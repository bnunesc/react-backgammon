import React from 'react';
import Checker from '../Checker/Checker';

const getCheckers = (player, numberOfCheckers, callerIdKey, canMove) => {

    if (player && numberOfCheckers) {
        //mount up to 5 checkers
        const count = numberOfCheckers > 5 ? 5 : numberOfCheckers;
        //checkers array
        const checkers = [];

        //Get checkers
        for (let i = 0; i < count; i++) {
            //highlight last checker if it can move
            if (canMove && i === count -1 ){
                checkers.push(<Checker player={player} count={1} key={callerIdKey + player + 'P' + i} canMove={1}/>);
            }
            else {
                checkers.push(<Checker player={player} count={1} key={callerIdKey + player + 'P' + i} />);
            }                            
        }

        //add label to the first checker if the point has more than 5 checkers
        if (numberOfCheckers > 5) {
            checkers[0] = <Checker player={player} count={numberOfCheckers - 4} key={callerIdKey + player + 'P0'} />;
        }

        return checkers
    } else {
        return null;
    }
}

export default getCheckers;