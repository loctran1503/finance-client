import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { setIsLoading } from "../../store/reducers/authSlice";
import { getCryptoListApi, getCryptoTrendingApi } from "../../utils/api/crypto";
import { decimalConverterWithoutCurrency } from "../../utils/funnctions/decimal";
import { CryptoCurrency, CryptoTrendingType } from "../../utils/types/api";
import Pagination from "../Pagination";
import styles from "./styles.module.scss";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 ,// optional, default to 1.

  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const CryptoList = () => {
  const [cryptoList, setCryptoList] = useState<CryptoCurrency[]>([]);
  const [cryptoTrending, setCryptoTrending] = useState<CryptoTrendingType[]>(
    []
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const cryptoTitleRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const executeScroll = () => {
    if (cryptoTitleRef.current) {
      cryptoTitleRef.current.scrollIntoView();
    }
  };

  const { page } = useParams();

  useEffect(() => {
    const callApi = async () => {
      try {
        let convertPage: number;
        if (page) {
          convertPage = +page;
        } else {
          convertPage = 1;
        }

        dispatch(setIsLoading(true));
        const result = await getCryptoListApi(convertPage);

        dispatch(setIsLoading(false));
        if (
          result.success &&
          result.cryptoList &&
          result.active_cryptocurrencies
        ) {
          setTotalCount(result.active_cryptocurrencies);
          setCryptoList(result.cryptoList);
          executeScroll();
        }

        const resultCryptoTrending = await getCryptoTrendingApi();
        if (resultCryptoTrending.success && resultCryptoTrending.cryptoList) {
          setCryptoTrending(resultCryptoTrending.cryptoList);
        }
      } catch (error) {
        dispatch(setIsLoading(false));
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
  }, [page]);

  const handleClickToDetail = (id: string) => {
    navigate({
      pathname: `/crypto/${id}`,
    });
    dispatch(setIsLoading(true));
  };

  const handlePageChange = (page: number) => {
    navigate({
      pathname: `/${page}`,
    });
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
                    <h2 className={styles.cryptoCurrencyTitle}>
                      Top 7 Trending
                    </h2>
                  
                      <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={false}
                        arrows={false}
                        infinite={true}
                        autoPlay={true}
                        responsive={responsive}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="all 1s"
                        transitionDuration={1000}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                      >
                    
                        {cryptoTrending.length > 0 &&
                          cryptoTrending.map((item) => {
                            return (
                             
                                <div
                                key={`${item.name}`}
                                  className={clsx(styles.cryptoItem,styles.margin)}
                                  onClick={() => handleClickToDetail(item.id)}
                                >
                                  <div className={styles.header}>
                                    <h3 className={styles.cryptoName}>
                                      <span className={styles.cryptoRanking}>
                                        #{item.market_cap_rank}
                                      </span>
                                      {item.name}
                                    </h3>

                                    <img
                                      className={styles.cryptoImage}
                                      src={item.small}
                                    />
                                  </div>
                                  <div className={styles.body}>
                                    {/* Id */}
                                    <p className={styles.attribute}>
                                      Score:
                                      <span className={styles.value}>
                                        {item.score}
                                      </span>
                                    </p>

                                    {/* Symbol */}
                                    <p className={styles.attribute}>
                                      Symbol:
                                      <span className={styles.value}>
                                        {item.symbol}
                                      </span>
                                    </p>

                                    {/* Price */}
                                    <p className={styles.attribute}>
                                      Price BTC:
                                      <span className={styles.value}>
                                        $
                                        {decimalConverterWithoutCurrency(
                                          item.price_btc
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                       
                            );
                          })}
                      </Carousel>
                      {/* Trending */}
             
                    <h2
                      ref={cryptoTitleRef}
                      className={styles.cryptoCurrencyTitle}
                    >
                      All Cryptocurrency
                    </h2>
                    <div className={styles.container}>
                      <div className="row">
                        {cryptoList.map((item) => {
                          return (
                            <div
                              className="col l-3 m-3 c-12"
                              key={`${item.name}`}
                            >
                              <div
                                className={styles.cryptoItem}
                                onClick={() => handleClickToDetail(item.id)}
                              >
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
                                      $
                                      {decimalConverterWithoutCurrency(
                                        item.current_price
                                      )}
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
                                      $
                                      {decimalConverterWithoutCurrency(
                                        item.market_cap
                                      )}
                                    </span>
                                  </p>
                                  {/* Volumn(24h) */}
                                  <p className={styles.attribute}>
                                    Volumn:
                                    <span className={styles.value}>
                                      {decimalConverterWithoutCurrency(
                                        item.total_volume
                                      )}
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
