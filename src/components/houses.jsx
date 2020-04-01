import React, { Component } from 'react';
import { connect } from 'react-redux';
import HouseItem from './houseItem';
import Pagination from './pagination';
import FindHouseInfo from './findHouseInfo';

class Houses extends Component {
  constructor() {
    super();
    this.state = {
      itemsPerPage: 8,
      actualPage: 1,
      previousNumberOfItem: ''
    }
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({actualPage: 1})
  }

  onPageChange(e) {
    if(e.target.innerHTML === 'Previous') {
      this.setState({actualPage: this.state.actualPage - 1});
    } else if(e.target.innerHTML === 'Next') {
      this.setState({actualPage: this.state.actualPage + 1});
    } else {
      this.setState({actualPage: Number(e.target.innerHTML)});
    }
  }

  render() {
    let priceFrom = !this.props.priceFrom ? 0 : this.props.priceFrom;
    let priceTo = !this.props.priceTo ? 99999999999 : this.props.priceTo;
    let surfaceFrom = !this.props.surfaceFrom ? 0 : this.props.surfaceFrom;
    let surfaceTo = !this.props.surfaceTo ? 99999999999 : this.props.surfaceTo;
    let types = this.props.homeType.filter( item => item.checked);
    let typesValues = types.map( i => i.value);

    const filtered = this.props.houses.filter( (house, i) => {
      return (house.city.toLowerCase().includes(this.props.city.toLowerCase()) &&
          house.price > priceFrom &&
          house.price < priceTo &&
          house.surface > surfaceFrom &&
          house.surface < surfaceTo &&
          (!this.props.beds || house.beds === this.props.beds) &&
          typesValues.includes(house.type))
    });

    const houses = filtered.map( (house, i) => {
      if(i >= (this.state.actualPage - 1) * this.state.itemsPerPage && i <= this.state.actualPage * this.state.itemsPerPage - 1) {
        return <HouseItem
          city={house.city}
          street={house.street}
          price={house.price}
          surface={house.surface}
          beds={house.beds}
          key={i}
          userName={house.userName}
          image={house.img}
          faceImg={house.faceImg}
          latitude={house.latitude}
          longitude={house.longitude}
        />;
      } else {
        return '';
      }

    });
    return(
      <div className='row'>
        <div className='col-12 p-2 text-center color-grey'>
          <FindHouseInfo items={filtered.length} />
        </div>
        {houses}
        <div className='col-md-12'>
          <Pagination page={this.state.actualPage} totalPages={Math.ceil(filtered.length/this.state.itemsPerPage)} onPageChange={this.onPageChange.bind(this)}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
    city: state.houses.city,
    priceFrom: state.houses.priceFrom,
    priceTo: state.houses.priceTo,
    surfaceFrom: state.houses.surfaceFrom,
    surfaceTo: state.houses.surfaceTo,
    beds: state.houses.beds,
    homeType: state.houses.homeType,
    latitude: state.houses.latitude,
    longitude: state.houses.longitude
  }
};

export default connect(mapStateToProps)(Houses);
