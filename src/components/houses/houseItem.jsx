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
    <div className='col-md-6 position-relative' onMouseEnter={(e) => props.mouseOverTooltipData(e, props.latitude, props.longitude)} onMouseLeave={(e) => props.mouseOverTooltipData(e)}>
      <img src={props.image} alt={props.city} className='w-100 h-90 border-radius-10'/>
      <div className='position-absolute top-0 h-90 d-flex flex-column' style={{justifyContent: 'space-between', width: '90%'}}>
        <div>
          <span className='bg-yellow text-white no-user-selection text-10'>{props.paymentType.toUpperCase()}</span>
        </div>
        <div id='house-details'>
          <div id='house-username'>
            <img src={props.faceImg} alt='face' className='face-img no-user-selection' />
            <span className='no-user-selection text-white font-weight-bolder'>{props.userName}</span>
          </div>
          <span id='house-address' className='no-user-selection text-white'>{props.city} {props.street}</span>
          <span id='house-surface' className='no-user-selection text-white'><img src={surface} alt='icon' className='img-icon'/> {props.surface} m<sup>2</sup></span>
          <span id='house-beds' className='no-user-selection text-white'><img src={bed} alt='bed' className='img-icon'/> {props.beds}</span>
          <span id='house-price' className='no-user-selection text-white font-weight-bolder'>{formatPrice(props.price)} zł</span>
        </div>
      </div>
      <div id='black-layer-bottom' className='position-absolute top-0 border-radius-10'>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return { }
}

export default connect(mapStateToProps, { mouseOverTooltipData })(HouseItem);
