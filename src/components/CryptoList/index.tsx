import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { cryptoListUrl } from "../../utils/api/apiLink";
import { decimalConverter } from "../../utils/funnctions/decimal";
import { CryptoCurrency } from "../../utils/types/api";
import Pagination from "../Pagination";
import styles from "./styles.module.scss";

const CryptoList = () => {
  const [cryptoList, setCryptoList] = useState<CryptoCurrency[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount,setTotalCount] = useState<number>(0)
  const cryptoTitleRef = useRef<HTMLDivElement>(null)
  const executeScroll = () => {
    if(cryptoTitleRef.current){
      cryptoTitleRef.current.scrollIntoView() 
    }
  }
  useEffect(() => {
    const callApi = async () => {
      try {
        const global = await axios.get('https://api.coingecko.com/api/v3/global',{
          withCredentials:false
        })
        if(global.data.data.active_cryptocurrencies){
          setTotalCount(global.data.data.active_cryptocurrencies)
        }

        const url = cryptoListUrl({
          page: currentPage,
        });
        const result = await axios.get<CryptoCurrency[]>(url, {
          withCredentials: false,
        });
     
        
        if (result.data.length > 0) {
          setCryptoList(result.data);
          console.log(result.data);
          executeScroll()
        }
      } catch (error) {
        console.log(`coingecko get api error`);

        console.log(error);
      }
    };
    callApi();
  }, [currentPage]);

  const handlePageChange = (page: number) => {

    setCurrentPage(page);
   
  };
  return (
    <div>
      {cryptoList.length > 0 && (
        <>
          <div className={styles.wrapper}>
            <div className="grid wide">
              <div className="row">
                <div className="col l-12 m-12 c-12">
                <h2 ref={cryptoTitleRef} className={styles.cryptoCurrencyTitle}>All Cryptocurrency</h2> 
                  <div className={styles.container}>
                    <div className="row">
                 
                      {cryptoList.map((item) => {
                        return (
                          <div className="col l-3 m-3 c-12" key={item.id}>
                            <div className={styles.cryptoItem}>
                              <div className={styles.header}>
                                <h3 className={styles.cryptoName}>
                                  <span className={styles.cryptoRanking}>
                                    #{item.market_cap_rank}
                                  </span>
                                  {item.name}
                                </h3>

                                <img
                                  className={styles.cryptoImage}
                                  src={item.image}
                                />
                              </div>
                              <div className={styles.body}>
                                {/* Price */}
                                <p className={styles.attribute}>
                                  Price:
                                  <span className={styles.value}>
                                    {decimalConverter(item.current_price)}
                                  </span>
                                </p>
                                {/*   24h % */}
                                <p className={styles.attribute}>
                                  Price Change In 24h(%):
                                  <span className={styles.value}>
                                    {item.price_change_percentage_24h}%
                                  </span>
                                </p>
                                {/* Market cap */}
                                <p className={styles.attribute}>
                                  Market Cap:
                                  <span className={styles.value}>
                                    {decimalConverter(item.market_cap)}
                                  </span>
                                </p>
                                {/* Volumn(24h) */}
                                <p className={styles.attribute}>
                                  Volumn:
                                  <span className={styles.value}>
                                    {decimalConverter(item.total_volume)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.pagination}>
                    <Pagination
                      className={clsx("pagination-bar")}
                      currentPage={currentPage}
                      totalCount={totalCount}
                      pageSize={100}
                      onPageChange={(page: number) => handlePageChange(page)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoList;
