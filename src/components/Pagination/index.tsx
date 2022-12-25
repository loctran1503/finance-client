import classnames from 'classnames';
import React from 'react';
import { DOTS, usePagination } from './Pagination';




interface PaginationProps{
    onPageChange:Function
    totalCount:number
   
    siblingCount? :number,
    currentPage :number,
    pageSize :number,
    className : string
}

const Pagination = (props : PaginationProps)=> {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if(!paginationRange){
    console.log("pagination is null")
    return null
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
      
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber,index) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={`${pageNumber}_${index}`}>&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
           
            })}
            key={`${pageNumber}_${index}`}
            onClick={() => {
              onPageChange(pageNumber)
              console.log(`pageNumber: ${pageNumber} - currentPage: ${currentPage}`)

            }}

          >
            <h1>{pageNumber}</h1>
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;