import styled from '@emotion/styled';

const Root = styled.div`
  display: block;
  margin-top: -2px;
  background: #fff !important;
  height: 2px;
  position: relative;
  z-index: 100;
`;

export const StrengthBarItem = styled.div`
  height: 2px;
  background: ${({ color }) => color};
`;

export default Root;
