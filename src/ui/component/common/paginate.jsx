// @flow
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Form, FormField } from 'component/common/form';
import ReactPaginate from 'react-paginate';

type Props = {
  loading: boolean,
  totalPages: number,
  location: { search: string },
  history: { push: string => void },
  onPageChange: number => void,
};

function Paginate(props: Props) {
  const { totalPages, loading, location, history, onPageChange } = props;
  const { search } = location;
  const urlParams = new URLSearchParams(search);
  const currentPage = Number(urlParams.get('page')) || 1;

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  const changePage = (newPageNumber: number) => {
    if (currentPage === newPageNumber) {
      return;
    }

    history.push(`?page=${newPageNumber}`);
  };

  const paginate = (e: SyntheticKeyboardEvent<*>) => {
    // Change page if enter was pressed, and the given page is between the first and the last page
    const pageFromInput = Number(e.currentTarget.value);

    if (
      pageFromInput &&
      e.keyCode === 13 &&
      !Number.isNaN(pageFromInput) &&
      pageFromInput > 0 &&
      pageFromInput <= totalPages
    ) {
      changePage(pageFromInput);
    }
  };

  return (
    totalPages > 1 &&
    !loading && (
      <Form>
        <fieldset-group class="fieldset-group--smushed fieldgroup--paginate">
          <fieldset-section>
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={2}
              previousLabel="‹"
              nextLabel="›"
              activeClassName="pagination__item--selected"
              pageClassName="pagination__item"
              previousClassName="pagination__item pagination__item--previous"
              nextClassName="pagination__item pagination__item--next"
              breakClassName="pagination__item pagination__item--break"
              marginPagesDisplayed={2}
              onPageChange={e => changePage(e.selected + 1)}
              forcePage={currentPage - 1}
              initialPage={currentPage - 1}
              containerClassName="pagination"
            />
          </fieldset-section>

          <FormField
            className="paginate-channel"
            onKeyUp={e => paginate(e)}
            label={__('Go to page:')}
            type="text"
            name="paginate-file"
          />
        </fieldset-group>
      </Form>
    )
  );
}

export default withRouter(Paginate);
