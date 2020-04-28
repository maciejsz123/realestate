import React from 'react';

function FindHouseInfo(props) {
  if(props.items) {
    return(
      <div style={{color: 'grey'}}>found {props.items} items</div>
    )
  } else {
    return(
      <div style={{color: 'grey'}}>no items for given criteria</div>
    )
  }

}

export default FindHouseInfo;
