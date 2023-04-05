import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Heading, HStack, VStack } from "@chakra-ui/react";
import Loader from "./Loader";
import { ExchangeCardStyled } from "./exchangeCard";
import Error from "./Error";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, []);
  if (error) return <Error />;

  return (
    <>
      <Container maxW={"container.lg"}>
        {loading ? (
          <Loader />
        ) : (
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((exchange) => {
              return (
                <ExchangeCard
                  key={exchange.id}
                  name={exchange.name}
                  image={exchange.image}
                  rank={exchange.trust_score_rank}
                  url={exchange.url}
                />
              );
            })}
          </HStack>
        )}
      </Container>
    </>
  );
};
const ExchangeCard = ({ id, name, image, rank, url }) => {
  return (
    <ExchangeCardStyled>
      <a href={url} target="blank">
        <div className="exchange-card">
          <img src={image} alt="exchange" />
          <h4>{rank}</h4>
          <h1>{name}</h1>
        </div>
      </a>
    </ExchangeCardStyled>
  );
};
export default Exchanges;
export const server = `https://api.coingecko.com/api/v3`;
