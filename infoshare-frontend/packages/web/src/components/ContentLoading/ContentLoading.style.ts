import styled from '@emotion/styled';

const Root = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Root;
