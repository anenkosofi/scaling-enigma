import React, { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { Container } from '@components/Container';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectPage } from '@store/filters/selectors';
import { setPage } from '@store/filters/slice';
import { selectTotal } from '@store/todos/selectors';

import './Pagination.scss';

export const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const selectedPage = useAppSelector(selectPage);
  const todos = useAppSelector(selectTotal);

  const pages = Math.ceil(todos / 10);
  const nextPage = selectedPage + 1;
  const prevPage = selectedPage - 1;

  const setPageHandler = (page: number) => {
    dispatch(setPage(page));
  };
  const renderPageNumbers = () => {
    const pageNumbers: React.ReactElement[] = [];
    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(
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
      }
    } else {
      if (selectedPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(
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
        }
        pageNumbers.push(
          <li
            key="elleipsis-left"
            className="page-list__item page-list__item_ellipsis"
          >
            ...
          </li>
        );
        pageNumbers.push(
          <li
            key={pages}
            onClick={() => setPageHandler(pages)}
            className={
              selectedPage === pages
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            {pages}
          </li>
        );
      } else if (selectedPage > pages - 3) {
        pageNumbers.push(
          <li
            key={1}
            onClick={() => setPageHandler(1)}
            className={
              selectedPage === 1
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            1
          </li>
        );
        pageNumbers.push(
          <li
            key="ellipsis-right"
            className="page-list__item page-list__item_ellipsis"
          >
            ...
          </li>
        );
        for (let i = pages - 3; i <= pages; i++) {
          pageNumbers.push(
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
        }
      } else {
        pageNumbers.push(
          <li
            key={1}
            onClick={() => setPageHandler(1)}
            className={
              selectedPage === 1
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            1
          </li>
        );
        pageNumbers.push(
          <li
            key="ellipsis-left"
            className="page-list__item page-list__item_ellipsis"
          >
            ...
          </li>
        );
        for (let i = selectedPage - 1; i <= selectedPage + 1; i++) {
          pageNumbers.push(
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
        }
        pageNumbers.push(
          <li
            key="ellipsis-right"
            className="page-list__item page-list__item_ellipsis"
          >
            ...
          </li>
        );
        pageNumbers.push(
          <li
            key={pages}
            onClick={() => setPageHandler(pages)}
            className={
              selectedPage === pages
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            {pages}
          </li>
        );
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
