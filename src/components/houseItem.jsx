import React from 'react';
import surface from '../imgs/surface.png';
import bed from '../imgs/bed.png';

function formatPrice(value) {
  value = Number(value);
  if(isNaN(value)) {
    return 'nan'
  }
  value = value.toFixed(2);
  value = value.toString().split("").reverse();
  for(let i = 0 ; i < value.length ; i++) {
    if(value[i-1] === '.' || value[i-1] === ' ') {
      i += 3;
      value.splice(i, 0, ' ');
    }
  }
  return value.reverse().join('').substring(0, value.length-3);
}

function HouseItem(props) {
  return(
    <div className='col-md-6 col-lg-4 position-relative houseItem'>
      <img src={props.image} alt={props.city} className='w-100 h-75'/>
      <div className='h-75 position-absolute imageDetails'>
        <img src={props.faceImg} alt='face' className='faceImg detailsHide' />
        <span className='noUserSelection detailsHide' style={{fontSize: '1rem'}}>{props.userName}</span>
        <span className='noUserSelection detailsHide'>{props.city} {props.street}</span>
        <span className='noUserSelection detailsHide'><img src={surface} alt='icon' className='imgIcon'/> {props.surface} m<sup>2</sup></span>
        <span className='noUserSelection detailsHide'><img src={bed} alt='bed' className='imgIcon'/> {props.beds}</span>
        <button type='button' className='btn btn-info detailsHide p-1' style={{justifySelf: 'start', fontSize: '0.85rem'}}>details</button>
      </div>
      <div className='h-75 position-absolute backgroundImage'>
      </div>
      <div className='position-absolute imgDescription'>
        <div><p>{props.city}</p></div>
        <div><p>{formatPrice(props.price)} zł</p></div>
      </div>
    </div>
  )
}

export default HouseItem;
