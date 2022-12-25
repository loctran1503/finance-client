import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { number } from "yup";
import { useAppDispatch } from "../../store/hook";
import { setIsLoading } from "../../store/reducers/authSlice";
import { getCryptoListApi } from "../../utils/api/crypto";
import { decimalConverter } from "../../utils/funnctions/decimal";
import { CryptoCurrency } from "../../utils/types/api";
import Pagination from "../Pagination";
import styles from "./styles.module.scss";

const CryptoList = () => {
  const [cryptoList, setCryptoList] = useState<CryptoCurrency[]>([]);

  const [totalCount,setTotalCount] = useState<number>(0)
  const cryptoTitleRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
 
  const executeScroll = () => {
    if(cryptoTitleRef.current){
      cryptoTitleRef.current.scrollIntoView() 
    }
  }

  const {page} = useParams()

  useEffect(() =>{
    const callApi = async () => {
      
      
      try {
        let convertPage : number
        if(page){
        convertPage=+page
        }else{
          convertPage=1
        }

        

        dispatch(setIsLoading(true))
        const result = await getCryptoListApi(convertPage)
     
        dispatch(setIsLoading(false))
        if (result.success && result.cryptoList && result.active_cryptocurrencies) {
          setTotalCount(result.active_cryptocurrencies)
          setCryptoList(result.cryptoList);
          executeScroll()
        }
        
      } catch (error) {
        dispatch(setIsLoading(false))
        console.log(`coingecko get api error`);

        console.log(error);
      }
    };
    callApi();


 
    
    // if(page){
    
    //   setCurrentPage(+page)
    // }else{
    //   setCurrentPage(1)
    // }
  },[page])

  const handleClickToDetail = (item : CryptoCurrency) =>{
 
    
    navigate({
      pathname:`/crypto/${item.id}`,
    })
    dispatch(setIsLoading(true))
    
  }



  const handlePageChange = (page: number) => {

    navigate({
      pathname:`/${page}`
    })
   
  };
  return (
    <div>
      {cryptoList.length > 0 && (
        <>
          <div className={styles.wrapper}>
            <div className="grid wide">
              <div className="row">
                <div className="col l-12 m-12 c-12">
                <div className={styles.containerParent}>
                <h2 ref={cryptoTitleRef} className={styles.cryptoCurrencyTitle}>All Cryptocurrency</h2> 
                  <div className={styles.container}>
                    <div className="row">
                 
                      {cryptoList.map((item) => {
                        return (
                          <div className="col l-3 m-3 c-12" key={`${item.name}`}>
                            <div className={styles.cryptoItem} onClick={() => handleClickToDetail(item)}>
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
                      currentPage={page ? +page : 1}
                      totalCount={totalCount}
                      pageSize={100}
                      onPageChange={(page: number) => handlePageChange(page)}
                    />
                  </div>
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
