import { OPTIONS_CHANGE, HOME_TYPE_CHANGE, REMOVE_VALUE, MOUSEOVER_TOOLTIP_MAP, FILTER_HOUSES, CHANGE_PAGE, SET_VISIBLE_AREA, CHOOSE_PAYMENT } from '../actions/types';
import room1 from '../imgs/room1.jpg';
import room2 from '../imgs/room2.jpg';
import room3 from '../imgs/room3.jpg';
import room4 from '../imgs/room4.jpg';
import room5 from '../imgs/room5.jpg';
import face1 from '../imgs/face1.jpg';
import face2 from '../imgs/face2.jpg';
import face3 from '../imgs/face3.jpg';
import face4 from '../imgs/face4.jpg';

const initialState = {
  city: '',
  priceFrom: '',
  priceTo: '',
  surfaceFrom: '',
  surfaceTo: '',
  beds: '',
  paymentType: [
    {value: 'for sale', checked: true},
    {value: 'for rent', checked: true}
  ],
  hoveredTooltip: [],
  filteredHouses: [],
  northEast: {lat: 180, lng: 180},
  southWest: {lat: 0, lng: 0},
  actualPage: 1,
  homeType: [
    {value: 'house', checked: true},
    {value: 'manufactured', checked: true},
    {value: 'multi-family', checked: true},
    {value: 'apartment', checked: true},
    {value: 'townhome', checked: true}
  ],
  houses: [
    {
      id: 1,
      city: 'Warszawa',
      street: 'Rynek 45',
      price: 50000,
      surface: 40,
      beds: 'studio',
      img: room1,
      faceImg: face1,
      userName: 'Ewa Kowalska',
      type: 'house',
      latitude: '52.2330653',
      longitude: '20.9211107',
      paymentType: 'for sale'
    }, {
      id: 2,
      city: 'Wrocław',
      street: 'Nowa 1',
      price: 12003400,
      surface: 120,
      beds: '3',
      img: room2,
      faceImg: face2,
      userName: 'Ewa Nowak',
      type: 'manufactured',
      latitude: '51.105385',
      longitude: '17.0367105',
      paymentType: 'for sale'
    }, {
      id: 3,
      city: 'Poznań',
      street: 'Wrocławska 54',
      price: 320000,
      surface: 220,
      beds: '3',
      img: room3,
      faceImg: face3,
      userName: 'Jan Kowalski',
      type: 'multi-family',
      latitude: '52.405704',
      longitude: '16.9307877',
      paymentType: 'for sale'
    }, {
      id: 4,
      city: 'Kraków',
      street: 'Rynek 15',
      price: 30000,
      surface: 20,
      beds: '1',
      img: room4,
      faceImg: face1,
      userName: 'Monika Nowak',
      type: 'apartment',
      latitude: '50.0641377',
      longitude: '19.9342954',
      paymentType: 'for sale'
    }, {
      id: 5,
      city: 'Kraków',
      street: 'Rynek 25',
      price: 35000,
      surface: 22,
      beds: '2',
      img: room5,
      faceImg: face1,
      userName: 'Monika Nowak',
      type: 'townhome',
      latitude: '50.0611732',
      longitude: '19.9335751',
      paymentType: 'for sale'
    }, {
      id: 6,
      city: 'Poznań',
      street: 'Rynek 54',
      price: 540000,
      surface: 70,
      beds: '2',
      img: room2,
      faceImg: face3,
      userName: 'Pawel Nowak',
      type: 'multi-family',
      latitude: '52.4081478',
      longitude: '16.9314839',
      paymentType: 'for sale'
    }, {
      id: 7,
      city: 'Wrocław',
      street: 'Rynek 5/5',
      price: 300000,
      surface: 45,
      beds: '1',
      img: room4,
      faceImg: face3,
      userName: 'Jan Kowalski',
      type: 'apartment',
      latitude: '51.1105238',
      longitude: '17.028247',
      paymentType: 'for sale'
    }, {
      id: 8,
      city: 'Warszawa',
      street: 'Rynek 54',
      price: 300000,
      surface: 70,
      beds: '3',
      img: room1,
      faceImg: face1,
      userName: 'Monika Wójcik',
      type: 'apartment',
      latitude: '52.2497446',
      longitude: '21.010053',
      paymentType: 'for sale'
    }, {
      id: 9,
      city: 'Wrocław',
      street: 'Nadrzeczna 5',
      price: 370000,
      surface: 40,
      beds: 'studio',
      img: room1,
      faceImg: face1,
      userName: 'Ewa Nowak',
      type: 'apartment',
      latitude: '51.1451689',
      longitude: '16.9313011',
      paymentType: 'for sale'
    }, {
      id: 10,
      city: 'Kraków',
      street: 'Celna 3',
      price: 450000,
      surface: 50,
      beds: '2',
      img: room5,
      faceImg: face4,
      userName: 'Jan Nowak',
      type: 'multi-family',
      latitude: '50.044654',
      longitude: '19.9456087',
      paymentType: 'for sale'
    }, {
      id: 11,
      city: 'Gdańsk',
      street: 'Fabryczna 33',
      price: 285000,
      surface: 35,
      beds: '2',
      img: room2,
      faceImg: face3,
      userName: 'Krzysztof Nowak',
      type: 'manufactured',
      latitude: '54.3552534',
      longitude: '18.4919756',
      paymentType: 'for sale'
    }, {
      id: 12,
      city: 'Łódź',
      street: 'Poznańska 23',
      price: 320000,
      surface: 37,
      beds: '2',
      img: room1,
      faceImg: face3,
      userName: 'Adam Nowak',
      type: 'manufactured',
      latitude: '51.7430138',
      longitude: '19.480958',
      paymentType: 'for sale'
    }, {
      id: 13,
      city: 'Radom',
      street: 'Górna 2',
      price: 275000,
      surface: 44,
      beds: '2',
      img: room1,
      faceImg: face3,
      userName: 'Krzysztof Kowalski',
      type: 'townhome',
      latitude: '51.3912967',
      longitude: '21.1700084',
      paymentType: 'for sale'
    }, {
      id: 14,
      city: 'Szczecin',
      street: 'Piotrowska 38',
      price: 1500,
      surface: 44,
      beds: '2',
      img: room1,
      faceImg: face1,
      userName: 'Ewa Kowalska',
      type: 'townhome',
      latitude: '53.41918',
      longitude: '14.483137',
      paymentType: 'for rent'
    }, {
      id: 15,
      city: 'Wrocław',
      street: 'Nowa 38',
      price: 1800,
      surface: 44,
      beds: '2',
      img: room2,
      faceImg: face4,
      userName: 'Marcin Marcinowski',
      type: 'manufactured',
      latitude: '51.1056718',
      longitude: '17.0394426',
      paymentType: 'for rent'
    }, {
      id: 16,
      city: 'Radom',
      street: 'Rynek 38',
      price: 1200,
      surface: 34,
      beds: 'studio',
      img: room3,
      faceImg: face1,
      userName: 'Ewa Nowakowska',
      type: 'apartment',
      latitude: '51.4029997',
      longitude: '21.1432545',
      paymentType: 'for rent'
    }, {
      id: 17,
      city: 'Łódź',
      street: 'Kościuszki 2',
      price: 1400,
      surface: 37,
      beds: '2',
      img: room1,
      faceImg: face2,
      userName: 'Ewa Nowak',
      type: 'townhome',
      latitude: '51.7626815',
      longitude: '19.4535208',
      paymentType: 'for rent'
    }, {
      id: 18,
      city: 'Warszawa',
      street: 'Nowa 2',
      price: 2500,
      surface: 44,
      beds: '3',
      img: room3,
      faceImg: face3,
      userName: 'Andrzej Kowalski',
      type: 'manufactured',
      latitude: '52.244139',
      longitude: '21.1845993',
      paymentType: 'for rent'
    }, {
      id: 19,
      city: 'Poznań',
      street: 'Rynek 33',
      price: 2200,
      surface: 42,
      beds: '2',
      img: room1,
      faceImg: face4,
      userName: 'Robert Kowalski',
      type: 'townhome',
      latitude: '52.4105838',
      longitude: '16.9084528',
      paymentType: 'for rent'
    }, {
      id: 20,
      city: 'Gdańsk',
      street: 'Podbielańska 2',
      price: 2000,
      surface: 38,
      beds: 'studio',
      img: room2,
      faceImg: face3,
      userName: 'Adam Nowak',
      type: 'apartment',
      latitude: '54.3552398',
      longitude: '18.6470108',
      paymentType: 'for rent'
    },
  ]
};

export default function(state = initialState, action) {
  switch(action.type) {
    case OPTIONS_CHANGE:
      return {...state, [action.payload.name]: action.payload.value}

    case CHOOSE_PAYMENT:
      let updatedPaymentType = state.paymentType.map( item => {
        if(item.value === action.value) {
          return {
            value: action.value,
            checked: action.checked
          }
        } else {
          return item;
        }
      });
      return {...state, paymentType: updatedPaymentType};

    case HOME_TYPE_CHANGE:
      let updatedType = state.homeType.map( item => {
        if(item.value === action.value) {
          return {
            value: action.value,
            checked: action.checked
          }
        } else {
          return item;
        }
      });
      return {...state, homeType: updatedType};

    case REMOVE_VALUE:
      return {...state, [action.payload]: action.value}

    case MOUSEOVER_TOOLTIP_MAP:
      return {...state, hoveredTooltip: action.payload}

    case FILTER_HOUSES:
      return {...state, filteredHouses: action.payload}

    case CHANGE_PAGE:
      return {...state, actualPage: action.payload}

    case SET_VISIBLE_AREA:
      return {...state, southWest: action.southWest, northEast: action.northEast}

    default:
      return state;
  }
}
