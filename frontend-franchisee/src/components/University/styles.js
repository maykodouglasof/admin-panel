import styled from "styled-components";

import ball from "~/assets/ball.png";

export const Container = styled.div`
  background: #272727;
  border-bottom: 5px solid #ddd;
  margin-bottom: 30px;
  background-image: url(${ball});
  background-repeat: repeat;

  @media (max-width: 768px) {
    padding: 20px;
    border: 0;
    margin: 0;
  }
`;

export const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
  padding: 50px 0;

  @media (max-width: 768px) {
    padding: 0;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 38px;
    }
  }

  p {
    font-size: 18px;
    line-height: 25px;
  }
`;
