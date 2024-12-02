import styled from "@emotion/styled";

export const LinkDiv = styled.div`
  background-color: ${props => props.bc || "yellowgreen"} !important;
`;

// 제품 출력 CSS
export const GoodDetailDiv = styled.div`
  h3 {
    color: red;
  }
  img {
    width: 200px;
  }
`;
