import React from 'react';
import surface from '../../imgs/surface.png';
import bed from '../../imgs/bed.png';
import { connect } from 'react-redux';
import { mouseOverTooltipData } from '../../actions/optionsAction';

export function formatPrice(value) {
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
    <div className='col-md-6 position-relative house-item' onMouseEnter={(e) => props.mouseOverTooltipData(e, props.latitude, props.longitude)} onMouseLeave={(e) => props.mouseOverTooltipData(e)}>
      <img src={props.image} alt={props.city} className='w-100 h-75'/>
      <div className='h-75 position-absolute image-details'>
        <img src={props.faceImg} alt='face' className='face-img details-hide' />
        <span className='no-user-selection details-hide' style={{fontSize: '1rem'}}>{props.userName}</span>
        <span className='no-user-selection details-hide'>{props.city} {props.street}</span>
        <span className='no-user-selection details-hide'><img src={surface} alt='icon' className='img-icon'/> {props.surface} m<sup>2</sup></span>
        <span className='no-user-selection details-hide'><img src={bed} alt='bed' className='img-icon'/> {props.beds}</span>
        <button type='button' className='btn btn-info details-hide p-1' style={{justifySelf: 'start', fontSize: '0.85rem'}}>details</button>
      </div>
      <div className='h-75 position-absolute background-image'>
      </div>
      <div className='position-absolute img-description'>
        <div><p>{props.city}</p></div>
        <div><p>{formatPrice(props.price)} zł</p></div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return { }
}

export default connect(mapStateToProps, { mouseOverTooltipData })(HouseItem);
