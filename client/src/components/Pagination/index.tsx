import React, { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { Container } from '@components/Container';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectPage } from '@store/filters/selectors';
import { setPage } from '@store/filters/slice';
import { selectTotal } from '@store/todos/selectors';

import './Pagination.scss';

const LIMIT = 10;

enum PageNumber {
  'ONE' = 1,
  'THREE' = 3,
  'FOUR' = 4,
  'FIVE' = 5,
}

export const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const selectedPage = useAppSelector(selectPage);
  const todos = useAppSelector(selectTotal);

  const pages = Math.ceil(todos / LIMIT);
  const nextPage = selectedPage + 1;
  const prevPage = selectedPage - 1;

  const setPageHandler = (page: number) => {
    dispatch(setPage(page));
  };

  const getPageNumberMarkup = (i: number) => (
    <li
      key={i}
      onClick={() => setPageHandler(i)}
      className={
        selectedPage === i
          ? 'page-list__item page-list__item_active'
          : 'page-list__item'
      }
    >
      {i}
    </li>
  );

  const getEllipsisMarkup = () => (
    <li
      key="elleipsis-left"
      className="page-list__item page-list__item_ellipsis"
    >
      ...
    </li>
  );

  const renderPageNumbers = () => {
    const pageNumbers: React.ReactElement[] = [];
    if (pages <= PageNumber.FIVE) {
      for (let i = PageNumber.ONE; i <= pages; i++) {
        pageNumbers.push(getPageNumberMarkup(i));
      }
    } else {
      if (selectedPage <= PageNumber.THREE) {
        for (let i = PageNumber.ONE; i <= PageNumber.FOUR; i++) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
        pageNumbers.push(getEllipsisMarkup());
        pageNumbers.push(getPageNumberMarkup(pages));
      } else if (selectedPage > pages - PageNumber.THREE) {
        pageNumbers.push(getPageNumberMarkup(PageNumber.ONE));
        pageNumbers.push(getEllipsisMarkup());
        for (let i = pages - PageNumber.THREE; i <= pages; i++) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
      } else {
        pageNumbers.push(getPageNumberMarkup(PageNumber.ONE));
        pageNumbers.push(getEllipsisMarkup());
        for (
          let i = selectedPage - PageNumber.ONE;
          i <= selectedPage + PageNumber.ONE;
          i++
        ) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
        pageNumbers.push(getEllipsisMarkup());
        pageNumbers.push(getPageNumberMarkup(pages));
      }
    }

    return pageNumbers;
  };

  return (
    <div className="page">
      <Container>
        <div className="page__list">
          <button
            type="button"
            disabled={selectedPage === 1}
            className="arrow-button"
            onClick={() => setPageHandler(prevPage)}
          >
            <IoIosArrowBack className="arrow-button__icon arrow-button__left" />
          </button>
          <ul className="page__list">{renderPageNumbers()}</ul>
          <button
            type="button"
            disabled={selectedPage === pages}
            className="arrow-button"
            onClick={() => setPageHandler(nextPage)}
          >
            <IoIosArrowBack className="arrow-button__icon arrow-button__right" />
          </button>
        </div>
      </Container>
    </div>
  );
};
