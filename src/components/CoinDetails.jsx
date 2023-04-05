import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Container,
  HStack,
  Image,
  Progress,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "./Coins";
import Error from "./Error";
import Loader from "./Loader";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //use Params() using here...
  const params = useParams();

  const [progress, setProgress] = useState(50);
  const [days, setDays] = useState("1");
  const [chartArray, setChartArray] = useState([]);
  const btns = ["1D", "1W", "1M", "1Y", "5Y", "ALL"];

  const switchChart = (key) => {
    switch (key) {
      case "1D":
        setDays("1");
        setLoading(true);
        break;
      case "5D":
        setDays("7");
        setLoading(true);
        break;
      case "1M":
        setDays("30");
        setLoading(true);
        break;
      case "1Y":
        setDays("365");
        setLoading(true);
        break;
      case "5Y":
        setDays("1825");
        setLoading(true);
        break;
      case "ALL":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("1");
        setLoading(true);
        break;
    }
  };
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chart_data } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=inr&days=${days}`
        );
        console.log(data);
        setCoin(data);
        setChartArray(chart_data.prices);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [params.id, days]);
  if (error) return <Error />;
  return (
    <ChakraProvider>
      <Container
        maxW={"container.lg"}
        // bgColor={"red"}
        ml={"50"}
        justifyContent={"center"}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <VStack p={"8"} spacing={"4"} alignItems={"flex-start"}>
              <Badge variant="solid" bgColor={"blackAlpha.800"}>
                Rank#{coin.market_cap_rank}
              </Badge>
              <Image
                src={coin.image.small}
                w={"50"}
                h={"50"}
                objectFit={"contain"}
              />
              <Stat>
                <StatLabel fontWeight={"bold"}>{coin.name}</StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"bold"}>
                  ₹{coin.market_data.current_price.inr}
                </StatNumber>
                <StatHelpText color={""}>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.price_change_percentage_24h} %
                </StatHelpText>
              </Stat>
              {/* chart */}
              <Box mb={"28"} width={"4xl"} borderWidth={"1"}>
                <Chart arr={chartArray} currency={"₹"} days={days} />
              </Box>
              {/* Buttons */}
              <HStack
                display={"flex"}
                gap={"5"}
                p={"0"}
                w={"6xl"}
                wrap={"wrap"}
              >
                {btns.map((btn) => {
                  return (
                    <Button
                      key={btn}
                      textColor="black"
                      onClick={() => {
                        switchChart(btn);
                      }}
                    >
                      {btn}
                    </Button>
                  );
                })}
              </HStack>

              <VStack>
                <Progress
                  borderRadius={"lg"}
                  w={"3xl"}
                  value={`${progress}`}
                  size="xs"
                  colorScheme="green"
                />
                <HStack w={"3xl"} justifyContent={"space-between"}>
                  <Badge children={coin.market_data.low_24h.inr}></Badge>
                  <Text>24H Range</Text>
                  <Badge children={coin.market_data.high_24h.inr}></Badge>
                </HStack>
              </VStack>
              <Box w={"full"} p={"4"}>
                <Item
                  title={"Total Supply"}
                  value={coin.market_data.total_supply}
                />
                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`₹${coin.market_data.market_cap.inr}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    </ChakraProvider>
  );
};
const Item = ({ title, value }) => {
  return (
    <>
      <HStack justifyContent={"space-between"} my={"4"} w={"3xl"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
          {title}
        </Text>
        <Text>{value}</Text>
      </HStack>
    </>
  );
};
export default CoinDetails;

const CustomBar = ({ low, high }) => (
  <ChakraProvider>
    <VStack></VStack>
  </ChakraProvider>
);
