import styled from "styled-components";
export const ExchangeCardStyled = styled.div`
  .exchange-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 2rem;
    border-radius: 10px;
    width: 200px;
    height: 200px;
    margin: 1rem;
    color: #44475b;
    font-family: sans-serif;
    transition: transform 0.3s ease;
    box-shadow: 0 1px 7px 0 rgb(0, 0, 0, 0.1);
  }
  .exchange-card:hover {
    transform: scale(1.01);
  }
  .exchange-card > h1 {
    font-weight: bold;
  }
  .exchange-card > img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 5px;
  }
`;
