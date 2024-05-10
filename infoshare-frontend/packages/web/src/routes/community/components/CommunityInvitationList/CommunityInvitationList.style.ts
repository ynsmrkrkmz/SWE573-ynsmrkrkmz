import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { DataGrid } from '@mui/x-data-grid';

const Root = styled.div`
  display: block;
  overflow: overlay;
`;

export const card = css`
  padding: 0 1.5rem 1.75rem 1.5rem;
`;

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: '1px',
  borderStyle: 'solid',
  borderRadius: '0px 3px',
  borderColor: '#ebedf5',
  boxShadow: '0px 4px 4px 0px #eef1fb',
  minHeight: '300px',
}));

export const cardSubTitle = css``;

export default Root;
