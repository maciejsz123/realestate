import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeOptions, removeValue, filterHouses, changePage } from '../actions/optionsAction';
import remove from '../imgs/remove.png';

class Options extends Component{

  componentDidMount() {
    Array.from(document.getElementsByClassName('prevent-close')).forEach( (item) => {
      item.addEventListener('click', (e) => {
        if(e.target.nodeName === 'DIV' || e.target.nodeName==='LABEL') {
          e.stopPropagation();
        }
      })
    });
    Array.from(document.getElementsByClassName('dropdown')).forEach( (item) => {
      item.addEventListener('mouseleave', (e_mouse) => {
        var change = true;
        document.addEventListener('click', (e) => {
          if(change) {
            this.changeTitle(e_mouse.target.firstChild.id);
          }
          change = false;
        })
      })
    });
  }

  async onChange(e) {
    let isNumber = !isNaN(Number(e.target.value));
    if(isNumber && (e.target.name === 'surfaceFrom' || e.target.name === 'surfaceTo' || e.target.name === 'priceFrom' || e.target.name === 'priceTo')) {
      this.props.changeOptions(e);
    } else if(e.target.name === 'beds') {
      Array.from(document.querySelectorAll('.bedsButtons')).forEach( elem => {
        elem.classList.remove('bedsActive');
      });
      e.target.parentNode.classList.add('bedsActive');
      this.props.changeOptions(e);
    } else if (e.target.name === 'homeType' || e.target.name === 'city'){
      this.props.changeOptions(e);
    }
    await this.props.changePage(1);
    await this.props.filterHouses(this.props);
  }

  titleDetail(element, from, to, unit, name) {
    if(Number(from) > Number(to)) {
      this.setState({[`${name}To`]: ''});
      element.innerHTML = `${from}${unit}+`;
    } else if(!from && !to) {
      element.innerHTML = name;
    } else if(!from) {
      element.innerHTML = `up to ${to}${unit}`;
    } else if(!to) {
      element.innerHTML = `${from}${unit}+`
    } else {
      element.innerHTML = `${from}${unit} - ${to}${unit}`;
    }
  }

  changeTitle(id) {
    let element = document.getElementById(id);
    switch(id) {
      case 'price':
        this.titleDetail(element, this.props.priceFrom, this.props.priceTo, ' zł', 'price')
        break;
      case 'surface':
        this.titleDetail(element, this.props.surfaceFrom, this.props.surfaceTo, ' km<sup>2</sup>', 'surface')
        break;
      case 'beds':
        if(!this.props.beds) {
          element.innerHTML = 'beds';
        } else {
          element.innerHTML = `beds: ${this.props.beds}`;
        } break;
      case 'homeType':
        let items = this.props.homeType.filter( item => item.checked);
        let itemsText = items.map( i => i.value);

        if(this.props.homeType.length === items.length) {
          element.innerHTML = 'home types';
        } else if(items.length === 0) {
          element.innerHTML = 'check at least one';
        } else {
          if(String(itemsText).length < 20) {
            element.innerHTML = String(itemsText);
          } else {
            element.innerHTML = String(itemsText).substring(0,20) + '...';
          }
        } break;
      default:
        return 'err';
    }
  }

  onAccept(e) {
    this.changeTitle(e.target.name);
  }

  async onRemove(e, name) {
    await this.props.removeValue(e);
    this.changeTitle(name);
  }

  handleKeyPress(e, name) {
    if(e.key === 'Enter') {
      let button = document.getElementsByName(name);
      button[0].click();
    }
  }

  render() {
    let homeTypes = this.props.homeType.map( (type, i) =>
      <div className='p-2' key={i}>
        <label>
          <input name='homeType' type='checkbox' checked={type.checked} value={type.value} onChange={this.onChange.bind(this)} />
          {type.value}
        </label>
      </div>
    );

    return(
      <div className='navbar navbar-expand-md'>
          <ul className="nav navbar-nav w-100 nav-justified">
            <li className="nav-item">
              <div className='btn-group'>
                <input style={{paddingRight: '25px'}} type='text' maxLength='25' placeholder='city' name="city" value={this.props.city} onChange={this.onChange.bind(this)}/>
                <img src={remove} style={{right: '6px'}} alt='X' className='searchClear' name='city' onClick={this.onRemove.bind(this)}/>
              </div>
            </li>
            <li className='nav-item'>
              <div className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="/1" id='price'>price
                <span className="caret"></span></a>
                <div className="dropdown-menu prevent-close position-absolute pb-0 text-center" style={{minWidth: '250px'}}>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-6 pr-1 pl-1'>
                        <input style={{width: '100%', paddingRight: '20px'}} placeholder='from' name='priceFrom' value={this.props.priceFrom} onKeyPress={(e) => {this.handleKeyPress(e, 'price')}} onChange={this.onChange.bind(this)} />
                        <img src={remove} alt='X' className='searchClear' name='priceFrom' onClick={(e) => {this.onRemove(e, 'price')}}/>
                      </div>
                      <div className='col-6 pr-1 pl-1'>
                        <input style={{width: '100%', paddingRight: '20px'}} placeholder='to' name='priceTo' value={this.props.priceTo} onKeyPress={(e) => {this.handleKeyPress(e, 'price')}} onChange={this.onChange.bind(this)} />
                        <img src={remove} alt='X' className='searchClear' name='priceTo' onClick={(e) => {this.onRemove(e, 'price')}}/>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 mt-2 dropdown-button'>
                    <button type='button' name='price' className='btn m-2 pl-5 pr-5' onClick={this.onAccept.bind(this)}>ok</button>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-item'>
              <div className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="1" id='surface'>surface
                <span className="caret"></span></a>
                <div className="dropdown-menu prevent-close row position-absolute pb-0 text-center" style={{minWidth: '250px'}}>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-6 pr-1 pl-1'>
                        <input style={{width: '100%', paddingRight: '20px'}} placeholder='from' name='surfaceFrom' value={this.props.surfaceFrom} onKeyPress={(e) => {this.handleKeyPress(e, 'surface')}} onChange={this.onChange.bind(this)} />
                        <img src={remove} alt='X' className='searchClear' name='surfaceFrom' onClick={(e) => {this.onRemove(e, 'surface')}}/>
                      </div>
                      <div className='col-6 pr-1 pl-1'>
                        <input style={{width: '100%', paddingRight: '20px'}} placeholder='to' name='surfaceTo' value={this.props.surfaceTo} onKeyPress={(e) => {this.handleKeyPress(e, 'surface')}} onChange={this.onChange.bind(this)} />
                        <img src={remove} alt='X' className='searchClear' name='surfaceTo' onClick={(e) => {this.onRemove(e, 'surface')}}/>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 mt-2 dropdown-button'>
                    <button type='button' name='surface' className='btn m-2 pl-5 pr-5' onClick={this.onAccept.bind(this)}>ok</button>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-item'>
              <div className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="1" id='beds'>beds
                <span className="caret"></span></a>
                <div className='row text-center dropdown-menu prevent-close position-absolute pb-0' style={{minWidth: '250px'}}>
                  <div className='btn-group mr-1 ml-1'>
                    <label className='pt-1 pl-2 pr-2 pb-1 bedsButtons'>any<input style={{display: 'none'}} type='radio' onClick={this.onChange.bind(this)} name='beds' value=''></input></label>
                    <label className='pt-1 pl-2 pr-2 pb-1 bedsButtons'>studio<input style={{display: 'none'}} type='radio' onClick={this.onChange.bind(this)} name='beds' value='studio'></input></label>
                    <label className='pt-1 pl-2 pr-2 pb-1 bedsButtons'>1<input style={{display: 'none'}} type='radio' onClick={this.onChange.bind(this)} name='beds' value='1'></input></label>
                    <label className='pt-1 pl-2 pr-2 pb-1 bedsButtons'>2<input style={{display: 'none'}} type='radio' onClick={this.onChange.bind(this)} name='beds' value='2'></input></label>
                    <label className='pt-1 pl-2 pr-2 pb-1 bedsButtons'>3<input style={{display: 'none'}} type='radio' onClick={this.onChange.bind(this)} name='beds' value='3'></input></label>
                  </div>
                  <div className='mt-2 dropdown-button'>
                    <button type='button' name='beds' className='btn m-2 pl-5 pr-5' onClick={this.onAccept.bind(this)}>ok</button>
                  </div>
                </div>
              </div>
            </li>
            <li className='nav-item'>
              <div className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="1" id='homeType'>home types
                <span className="caret"></span></a>
                <div className='row text-center dropdown-menu prevent-close position-absolute pb-0 moveLeft' style={{minWidth: '250px'}}>
                  <div className='flex-d flex-row-reverse'>
                    <h4>Home type</h4>
                    {homeTypes}
                    <div className='mt-2 dropdown-button'>
                      <button type='button' name='homeType' className='btn m-2 pl-5 pr-5' onClick={this.onAccept.bind(this)}>ok</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.houses.city,
    priceFrom: state.houses.priceFrom,
    priceTo: state.houses.priceTo,
    surfaceFrom: state.houses.surfaceFrom,
    surfaceTo: state.houses.surfaceTo,
    beds: state.houses.beds,
    homeType: state.houses.homeType,
    houses: state.houses.houses,
    northEast: state.houses.northEast,
    southWest: state.houses.southWest
  }
}

export default connect(mapStateToProps, { changeOptions, removeValue, filterHouses, changePage })(Options);
