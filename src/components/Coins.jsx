import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Heading, HStack, VStack } from "@chakra-ui/react";
import Loader from "./Loader";
import { Image, Text } from "@chakra-ui/react";
import { Scale } from "chart.js";
import { ExchangeCardStyled } from "./exchangeCard";
import Error from "./Error";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}`);
        setCoins(data);
        // console.log(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, []);
  if (error) return <Error />;
  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((coin) => {
              return (
                <CoinCard
                  id={coin.id}
                  name={coin.name}
                  image={coin.image.large}
                  symbol={coin.symbol}
                  price={coin.market_data.current_price.inr}
                />
              );
            })}
          </HStack>
        )}
      </Container>
    </>
  );
};

const CoinCard = ({ id, name, image, symbol, price }) => {
  return (
    <ExchangeCardStyled>
      <Link to={`/coin/${id}`} target="blank">
        <div className="exchange-card">
          <img src={image} alt="exchange" />
          <h1>{symbol}</h1>
          <h1>{name}</h1>
          <p>₹ {price}</p>
        </div>
      </Link>
    </ExchangeCardStyled>
  );
};

export default Coins;
export const server = `https://api.coingecko.com/api/v3`;
