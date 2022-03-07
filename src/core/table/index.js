/**
 * Created By Nguyen Cong Thanh on 02/17/2020 13:52.
 *
 * Copyright intelIn 2020.
 */

import React, { useRef, useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import TablePagination from "@material-ui/core/TablePagination";
import Pagination from "@material-ui/core/Pagination";

import Style from 'core/_app.scss'
import Logger from 'service/logger'
import Model from './model'
import Localize from "service/localize";

const useStyles = makeStyles(theme => ({
  display: {
    display: "none",
  },
  paging: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  rootPage: {
    paddingRight: 32,
  },
}));

const TableComponent = props => {

  const {
    style = null,
    children = null,
    loading = false,
    total = null,
    list = null,
    resetPage = false,
    query = new Model(),
    onChange = () => { }
  } = props;


  const classes = useStyles();

  const [page, setPage] = useState(1)
  const [from, setFrom] = useState(0)
  const [limit, setLimit] = useState(30)

  useEffect(() => {
    if (resetPage) {
      setPage(1)
    }
  }, [resetPage])


  const handleChangeRowsPerPage = (event) => {
    try {
      Logger.info('TableComponent execute handleChangeRowsPerPage')
      let limitTemp = event.target.value
      Logger.debug('TableComponent execute handleChangeRowsPerPage receive limit', limitTemp)
      setPage(1)
      setFrom(0)
      setLimit(limitTemp);
      query.setFrom(0)
      query.setLimit(limitTemp)
      onChange(query)
    } catch (e) {
      Logger.error(`TableComponent execute handleChangeRowsPerPage ${e.toString()}`)
    }
  }

  const handleChangePage = (event, value) => {
    try {
      Logger.info('TableComponent execute handleChangePage')
      Logger.debug('TableComponent execute handleChangePage receive page', value)
      let fromTemp = Math.ceil((value - 1) * limit)
      setPage(value);
      setFrom(fromTemp)
      query.setFrom(fromTemp)
      onChange(query)
    } catch (e) {
      Logger.error(`TableComponent execute handleChangePage ${e.toString()}`)
    }
  }

  return (
    <Fragment>
      <div className={Style["form-table-default"]}>
        {children}
        {
          (!loading && total && total > 0) ? (
            <div className={classes.paging}>
              <TablePagination
                labelRowsPerPage={Localize.getLocalize('LC_LINE_PER_PAGE_PGNTION')}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${Localize.getLocalize('LC_OF_PGNTION')} ${count}`}
                component="div"
                count={total}
                page={page - 1}
                onPageChange={(event) => { console.log(event) }}
                rowsPerPage={limit}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[30, 50, 100]}
                classes={{ actions: classes.display, root: classes.rootPage }}
              />
              <Pagination
                count={Math.ceil(total / limit)}
                page={page}
                onChange={handleChangePage}
              />
            </div>
          ) : null
        }
      </div>
    </Fragment>
  );
}

export default TableComponent