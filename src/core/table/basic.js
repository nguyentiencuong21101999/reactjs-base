import * as React from 'react';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';

import LoadingCore from 'core/loading'
import Localize from "service/localize";
import Helper from 'service/helper'
import { styled } from '@material-ui/core/styles';

BasicTable.propTypes = {
  headerRows: PropTypes.array,
  rows: PropTypes.array,
  tableStyle: PropTypes.object,
  rowStyle: PropTypes.object,
  loading: PropTypes.element,
  cell: PropTypes.array,
  handleOnRow: PropTypes.func,
  rowHover: PropTypes.bool
};

BasicTable.defaultProps = {
  headerRows: [{
    value: "-",
    align: "left"
  }],
  rows: [{
    value: "-",
    align: "left"
  }],
  tableStyle: { minWidth: 650 },
  rowStyle: {},
  loading: <LoadingCore />,
  cells: [
    {
      field: "",
      align: "",
      parser: null,
    }
  ],
  handleOnRow: () => { },
  rowHover: false,
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f4f4f4',
    fontweight: 600
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function BasicTable(props) {
  const {
    headerRows,
    rows,
    tableStyle,
    rowStyle,
    loading,
    cells,
    handleOnRow,
    rowHover,
    option
  } = props;
  const handleOnParseCellValue = (parser, value, indexCell, row, index) => {
    try {
      switch (typeof parser) {
        case 'function':
          return parser(value, indexCell, row, index);
        default:
          return value;
      }
    } catch (e) {
      return value;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            <StyledTableCell align={'center'}>{Localize.getLocalize('LC_ORDER_NUM_TABLE_TITLE')}</StyledTableCell>
            {headerRows.map((item, index) => (
              <StyledTableCell key={index} align={item.align || 'left'}>{item.value || '-'}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows === null ? (
            <TableRow>
              <TableCell colSpan={headerRows.length + 1} algin={"center"}>
                {loading}
              </TableCell>
            </TableRow>
          ) : rows && rows.length > 0 ? (
            rows.map((row, index) => (

              <TableRow hover
                key={index}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }, { ...rowStyle }}
                onClick={() => handleOnRow(row)}
                sx={rowHover ? { cursor: "pointer" } : null}
              >
                <TableCell data-label={`${Localize.getLocalize('LC_ORDER_NUM_TABLE_TITLE')}`} align={'center'}>
                  {index + 1}
                </TableCell>
                {cells.map((cell, indexCell) => (
                  <TableCell data-label={headerRows[indexCell].value} key={indexCell} align={cell.align ? cell.align : 'center'} style={cell.style}>
                    {!Helper.isEmpty(row[cell.field]) ? handleOnParseCellValue(cell.parser, row[cell.field], indexCell, row, index) : "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headerRows.length + 1}
                style={{ textAlign: "center" }}
                data-test-id="noticeContent"
              >
                {Localize.getLocalize("LC_NO_DATA")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
