import styled from "styled-components";

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  tbody tr:nth-of-type(odd) {
    background: #f9f9f9;
  }

  tbody {
    font-size: 16px;

    td {
      padding: 8px 12px;

      &:last-child {
        display: flex;
        justify-content: flex-end;
      }

      a {
        color: #2684ff;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .description-cell {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

export default TableContainer;
