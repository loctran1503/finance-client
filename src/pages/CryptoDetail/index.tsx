import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authSelector, setIsLoading } from "../../store/reducers/authSlice";
import { getCryptoDetailApi } from "../../utils/api/crypto";
import {
  decimalConverter,
  decimalConverterWithoutCurrency,
} from "../../utils/funnctions/decimal";
import { CryptoCurrencyDetail, CryptoPricing } from "../../utils/types/api";
import styles from "./styles.module.scss";
import TradingChart from "./TradingChart";
import { Tooltip } from "react-tooltip";

interface OverViewType {
  name: string;
  children: ReactNode;
}

const CryptoDetail = () => {
  const { id } = useParams();
  const wsRef = useRef<WebSocket>();
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated } = useAppSelector(authSelector);
  const [cryptoOverview, setCryptoOverview] = useState<OverViewType>({
    name: "Overview",
    children: <div></div>,
  });

  const [cryptoInfo, setCryptoInfo] = useState<CryptoCurrencyDetail | null>(
    null
  );

  const [cryptoPricing, setCryptoPricing] = useState<CryptoPricing | null>(
    null
  );

  useEffect(() => {
    // First time ,render overview
    if(cryptoInfo){
      setCryptoOverview({
        ...cryptoOverview,
        children:<div className={styles.cryptoInfoBodyOverview}>
            <h4>
              Ranking:{" "}
              <span>
                {cryptoInfo.market_cap_rank}
              </span>
            </h4>
        <h4>
          Market Cap:{" "}
          <span>
            {decimalConverter(
              cryptoInfo.market_data.market_cap.usd
            )}
          </span>
        </h4>
        <h4>
          Total volume:{" "}
          <span>
            {decimalConverter(
              cryptoInfo.market_data.total_volume.usd
            )}
          </span>
        </h4>
        <h4>
          Total Supply:
          <span>
            {decimalConverterWithoutCurrency(
              cryptoInfo.market_data.total_supply
            )}
          </span>
        </h4>
        <h4>
          Max Supply:
          <span>
            {decimalConverterWithoutCurrency(
              cryptoInfo.market_data.max_supply
            )}
          </span>
        </h4>
        <h4>
          Circulating Supply:
          <span>
            {decimalConverterWithoutCurrency(
              cryptoInfo.market_data.circulating_supply
            )}
          </span>
        </h4>
        <h4>
          Website:{" "}
          <span className={styles.cryptoInfoBodyOverViewWebsite}>
            {cryptoInfo.links.homepage.length > 0 &&
              cryptoInfo.links.homepage.map(
                (item, index) =>
                  item.length > 0 && (
                
                      <a key={index} href={item}>
                      {item}
                    </a>
               
                  )
              )}
          </span>
        </h4>

        <h4>
          Blockchain Site:{" "}
          <span className={styles.cryptoInfoBodyOverViewHomepage}>
            {cryptoInfo.links.blockchain_site.length > 0 &&
              cryptoInfo.links.blockchain_site.map(
                (item, index) =>
                  item.length > 0 && (
                    <div key={index}>
                      <a  href={item}>
                      {item}
                    </a>
                    </div>
                  )
              )}
          </span>
        </h4>
      </div>
      })
    }
  }, [cryptoInfo]);

  useEffect(() => {
    const callApiToGetCryptoInfo = async () => {
      if (id) {
        const result = await getCryptoDetailApi(id);
        if (isLoading) {
          dispatch(setIsLoading(false));
        }
        if (result.crypto) {
          console.log(result.crypto);
          setCryptoInfo(result.crypto);

          const cryptoPricingWithoutWs: CryptoPricing = {
            c: {
              prevState: result.crypto.market_data.current_price.usd,
              state: result.crypto.market_data.current_price.usd,
            },
            p: {
              prevState:
                result.crypto.market_data.price_change_24h_in_currency.usd,
              state: result.crypto.market_data.price_change_24h_in_currency.usd,
            },
            P: result.crypto.market_data.price_change_percentage_1h_in_currency
              .usd,
            h: result.crypto.market_data.high_24h.usd,
            l: result.crypto.market_data.low_24h.usd,
          };
          setCryptoPricing(cryptoPricingWithoutWs);
        }
      }
    };
    callApiToGetCryptoInfo();
  }, []);

  useEffect(() => {
    try {
      if (!wsRef.current && cryptoInfo?.symbol) {
        wsRef.current = new WebSocket(
          `wss://stream.binance.com:9443/ws/${cryptoInfo.symbol}usdt@ticker`
        );
        wsRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (cryptoPricing) {
            setCryptoPricing((prevState) => ({
              ...cryptoPricing,
              c: {
                prevState: prevState!.c.state,
                state: data.c,
              },
              p: {
                prevState: prevState!.p.state,
                state: data.p,
              },
              P: data.P,
              h: data.h,
              l: data.l,
            }));
          }
        };
      }
    } catch (error) {
      console.log(error);
    }

    return () => wsRef.current?.close();
  }, [cryptoInfo?.symbol]);

  const handleBuy = () => {
    console.log(123);
  };

  const handleOverViewChange = (name: string) => {
    if(cryptoInfo){
      switch (name) {
        case "Overview":
          setCryptoOverview({
            ...cryptoOverview,
            name,
            children:<div className={styles.cryptoInfoBodyOverview}>
               <h4>
              Ranking:{" "}
              <span>
                {cryptoInfo.market_cap_rank}
              </span>
            </h4>
            <h4>
              Market Cap:{" "}
              <span>
                {decimalConverter(
                  cryptoInfo.market_data.market_cap.usd
                )}
              </span>
            </h4>
            <h4>
              Total volume:{" "}
              <span>
                {decimalConverter(
                  cryptoInfo.market_data.total_volume.usd
                )}
              </span>
            </h4>
            <h4>
              Total Supply:
              <span>
                {decimalConverterWithoutCurrency(
                  cryptoInfo.market_data.total_supply
                )}
              </span>
            </h4>
            <h4>
              Max Supply:
              <span>
                {decimalConverterWithoutCurrency(
                  cryptoInfo.market_data.max_supply
                )}
              </span>
            </h4>
            <h4>
              Circulating Supply:
              <span>
                {decimalConverterWithoutCurrency(
                  cryptoInfo.market_data.circulating_supply
                )}
              </span>
            </h4>
            <h4>
              Website:{" "}
              <span className={styles.cryptoInfoBodyOverViewWebsite}>
                {cryptoInfo.links.homepage.length > 0 &&
                  cryptoInfo.links.homepage.map(
                    (item, index) =>
                      item.length > 0 && (
                    
                          <a key={index} href={item}>
                          {item}
                        </a>
                   
                      )
                  )}
              </span>
            </h4>
    
            <h4>
              Blockchain Site:{" "}
              <span className={styles.cryptoInfoBodyOverViewHomepage}>
                {cryptoInfo.links.blockchain_site.length > 0 &&
                  cryptoInfo.links.blockchain_site.map(
                    (item, index) =>
                      item.length > 0 && (
                        <div key={index}>
                          <a  href={item}>
                          {item}
                        </a>
                        </div>
                      )
                  )}
              </span>
            </h4>
          </div>
          })
          break;
        case "Description":
          setCryptoOverview({
            ...cryptoOverview,
            name,
            children: <p
            dangerouslySetInnerHTML={{
              __html: cryptoInfo.description.en,
            }}
          ></p>
          })
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      {cryptoInfo && cryptoInfo?.symbol.length > 0 && (
        <div className={styles.wrapper}>
          <div className="grid wide">
            <div className="row">
              <div className="col l-12 m-12 c-12">
                <div className={styles.container}>
                 
                  {cryptoPricing && (
                    <div className={styles.header}>
                      <div className={styles.headerLeft}>
                        <div className={styles.cryptoNameAndThumb}>
                          <img src={cryptoInfo.image.small} alt="" />
                          <h3>
                            {cryptoInfo.name}({cryptoInfo.symbol.toUpperCase()})
                          </h3>
                        </div>
                        {/* Price */}
                        <div className={styles.price}>
                          <h4>Last Price</h4>
                          <p
                            className={clsx(
                              cryptoPricing.c.prevState ===
                                cryptoPricing.c.state
                                ? styles.equal
                                : cryptoPricing.c.prevState <
                                  cryptoPricing.c.state
                                ? styles.increase
                                : styles.decrease
                            )}
                          >
                            {decimalConverter(cryptoPricing.c.state)}
                          </p>
                        </div>

                        {/* 24h change */}
                        <div className={styles.price}>
                          <h4>24H Change</h4>
                          <p
                            className={clsx(
                              cryptoPricing.p.prevState ===
                                cryptoPricing.p.state
                                ? styles.equal
                                : cryptoPricing.p.prevState <
                                  cryptoPricing.p.state
                                ? styles.increase
                                : styles.decrease
                            )}
                          >{`${decimalConverter(cryptoPricing.p.state)}(${
                            cryptoPricing.P
                          }%)`}</p>
                        </div>

                        {/* 24h high */}
                        <div className={styles.price}>
                          <h4>24H High</h4>
                          <p>{decimalConverter(cryptoPricing.h)}</p>
                        </div>

                        {/* 24h low */}
                        <div className={styles.price}>
                          <h4>24H Low</h4>
                          <p>{decimalConverter(cryptoPricing.l)}</p>
                        </div>
                      </div>
                      {/* header right */}
                      <div className={styles.headerRight}>
                        <button
                          onClick={() => {
                            handleBuy();
                          }}
                          id="btn-buy"
                          disabled={!isAuthenticated}
                          className={clsx(
                            "btn",
                            styles.btnControl,
                            styles.btnBuy,
                            !isAuthenticated && styles.btnDeactive
                          )}
                        >
                          Buy
                        </button>
                        {/* <Tooltip anchorId="btn-buy" content="Hello World" place="top" isOpen={!isAuthenticated}  /> */}
                        <button
                          disabled={!isAuthenticated}
                          className={clsx(
                            "btn",
                            styles.btnControl,
                            !isAuthenticated && styles.btnDeactive
                          )}
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  )}
                  <div className={styles.chart}>
                    <TradingChart symbol={cryptoInfo.symbol} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Info */}
          <div className={styles.cryptoInfoHeader}>
            <div className="grid wide">
              <div className="row">
                <div className="col l-12 m-12 c-12">
                  <div className={styles.cryptoInfoHeaderContainer}>
                    <h4
                      className={clsx(
                        cryptoOverview.name === "Overview"
                          ? styles.overViewActive
                          : ""
                      )}
                      onClick={() => handleOverViewChange("Overview")}
                    >
                      Overview
                    </h4>
                    <h4
                      onClick={() => handleOverViewChange("Description")}
                      className={clsx(
                        cryptoOverview.name === "Description"
                          ? styles.overViewActive
                          : ""
                      )}
                    >
                      Description
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Crypto Info Body */}
          <div className="grid wide">
            <div className="row">
              <div className="col l-12 m-12 c-12">
                <div className={styles.cryptoInfoBody}>
                 {cryptoOverview.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoDetail;
