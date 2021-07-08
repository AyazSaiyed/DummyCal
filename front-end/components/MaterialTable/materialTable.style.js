import styled from 'styled-components';

export const TableWrapper = styled.div`
  .MuiTableRow-head {
    .MuiTableCell-root {
      background-color: #f1f1f1;
      &:first-child {
        text-align: center;
      }
    }
  }
  .MuiTableBody-root {
    .MuiTableCell-root:first-child {
      text-align: center;
    }
  }
`;
