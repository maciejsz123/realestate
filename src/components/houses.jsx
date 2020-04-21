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
      previousNumberOfItem: '',
      sortingOption: 'iddsc',
      sortingByData: 'id',
      sortingDirection: 'dsc'
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

  changeOption(e) {
    this.setState({
      sortingOption: e.target.value,
      sortingByData: e.target.value.substring(0, e.target.value.length - 3),
      sortingDirection: e.target.value.substring(e.target.value.length - 3)
    })
  }

  render() {
    let houses = this.props.filteredHouses.sort( (a,b) => {
      if(this.state.sortingDirection === 'asc') {
        return a[this.state.sortingByData] > b[this.state.sortingByData]
      } else {
        return a[this.state.sortingByData] < b[this.state.sortingByData]
      }
    }).map( (house, i) => {
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
      }
    });

    return(
      <div className='row list-of-houses'>
        <div className='col-12 text-center color-grey'>
          <FindHouseInfo items={this.props.filteredHouses.length} />
        </div>
        <div className='col-12 pb-2 text-center'>
          <span>sort by: </span>
          <select value={this.state.sortingOption} onChange={this.changeOption.bind(this)}>
            <option value='iddsc'>Newest</option>
            <option value='pricedsc'>Price [High to Low]</option>
            <option value='priceasc'>Price [Low to High]</option>
            <option value='surfacedsc'>surface [High to Low]</option>
            <option value='surfaceasc'>surface [Low to High]</option>
            <option value='bedsdsc'>number of bedroom</option>
          </select>
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
