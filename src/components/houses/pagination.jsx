import React, {Component} from 'react';

class Pagination extends Component {

  render() {
    let array = new Array(this.props.totalPages);
    for(let i = 0; i<array.length; i++) {
      array[i] = '';
    }
    let pages = array.map( (item, i) =>
      <li className='page-item' key={i+1}>
        <a href='#' onClick={this.props.onPageChange} className={`page-link ${i+1 === Number(this.props.page) ? 'actualPage' : ''}`}>
          {i+1}
        </a>
      </li>);

    return(
      <div className='row'>
        <div className='col-12'>
          <div className='pagination justify-content-center'>
            <li className={`page-item ${this.props.page === 1? 'disabled' : ''}`}><a href='#' onClick={this.props.onPageChange} className='page-link'>Previous</a></li>
            {pages}
            <li className={`page-item ${this.props.page === this.props.totalPages ? 'disabled' : ''}`}><a href='#' onClick={this.props.onPageChange} className='page-link'>Next</a></li>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;
