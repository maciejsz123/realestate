import React, { Component } from 'react';
import { connect } from 'react-redux';
import HouseItem from './houseItem';
import Pagination from './pagination';
import FindHouseInfo from './findHouseInfo';
import { changePage, filterHouses } from '../actions/optionsAction';

class Houses extends Component {
  constructor() {
    super();
    this.state = {
      itemsPerPage: 6,
      previousNumberOfItem: ''
    }
  }

 componentDidMount() {
   this.props.filterHouses(this.props);
  }

  onPageChange(e) {
    if(e.target.innerHTML === 'Previous') {
      this.props.changePage(this.props.actualPage - 1);
    } else if(e.target.innerHTML === 'Next') {
      this.props.changePage(this.props.actualPage + 1);
    } else {
      this.props.changePage(Number(e.target.innerHTML));
    }
  }

  render() {
    const houses = this.props.filteredHouses.map( (house, i) => {
      if(i >= (this.props.actualPage - 1) * this.state.itemsPerPage && i <= this.props.actualPage * this.state.itemsPerPage - 1) {
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
          <FindHouseInfo items={this.props.filteredHouses.length} />
        </div>
        {houses}
        <div className='col-md-12'>
          <Pagination page={this.props.actualPage} totalPages={Math.ceil(this.props.filteredHouses.length/this.state.itemsPerPage)} onPageChange={this.onPageChange.bind(this)}/>
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
    actualPage: state.houses.actualPage,
    filteredHouses: state.houses.filteredHouses,
    northEast: state.houses.northEast,
    southWest: state.houses.southWest
  }
};

export default connect(mapStateToProps, { changePage, filterHouses })(Houses);
