import React from 'react';

function FindHouseInfo(props) {
  if(props.items) {
    return(
      <div><b>{props.items}</b> Results Found</div>
    )
  } else {
    return(
      <div style={{color: 'grey'}}>no items for given criteria</div>
    )
  }

}

export default FindHouseInfo;
