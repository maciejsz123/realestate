import { OPTIONS_CHANGE, HOME_TYPE_CHANGE, REMOVE_VALUE, MOUSEOVER_TOOLTIP_MAP, FILTER_HOUSES, CHANGE_PAGE, SET_VISIBLE_AREA } from './types';

export function changeOptions(e) {
  return function(dispatch) {
    if(e.target.name === 'homeType') {
      dispatch({
        type: HOME_TYPE_CHANGE,
        value: e.target.value,
        checked: e.target.checked
      });
    } else {
      dispatch({
        type: OPTIONS_CHANGE,
        payload: e.target
      });
    }
  }
}

export function changePage(page) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_PAGE,
      payload: page
    })
  }
}

export function filterHouses(props) {
  let priceFrom = !props.priceFrom ? 0 : props.priceFrom;
  let priceTo = !props.priceTo ? 99999999999 : props.priceTo;
  let surfaceFrom = !props.surfaceFrom ? 0 : props.surfaceFrom;
  let surfaceTo = !props.surfaceTo ? 99999999999 : props.surfaceTo;
  let types = props.homeType.filter( item => item.checked);
  let typesValues = types.map( i => i.value);

  const filtered = props.houses.filter( (house, i) => {
    return (house.city.toLowerCase().includes(props.city.toLowerCase()) &&
      house.price > priceFrom &&
      house.price < priceTo &&
      house.surface > surfaceFrom &&
      house.surface < surfaceTo &&
      (!props.beds || house.beds === props.beds) &&
      typesValues.includes(house.type)) &&
      (props.northEast.lng > house.longitude && props.southWest.lng < house.longitude) &&
      (props.northEast.lat > house.latitude && props.southWest.lat < house.latitude)
  });

  return function(dispatch) {
    dispatch({
      type: FILTER_HOUSES,
      payload: filtered
    })
  }
}

export function setVisibleArea(northEast, southWest) {
  return function(dispatch) {
    dispatch({
      type: SET_VISIBLE_AREA,
      northEast: northEast,
      southWest: southWest
    });
  }
}

export function removeValue(e) {
  return function(dispatch) {
    dispatch({
      type: REMOVE_VALUE,
      payload: e.target.name,
      value: ''
    })
  }
}

export function mouseOverTooltipData(e, latitude = '', longitude = '') {
  return function(dispatch) {
    dispatch({
      type: MOUSEOVER_TOOLTIP_MAP,
      payload: (latitude && longitude) ? [[latitude, longitude]] : []
    })
  }
}
