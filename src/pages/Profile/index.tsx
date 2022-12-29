import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  authSelector,
  setIsLoading,
  userLogout,
} from "../../store/reducers/authSlice";
import { DefaultResponse } from "../../utils/types/api";
import styles from "./styles.module.scss";

import { formatDateToMDY } from "../../utils/funnctions/date";
import { decimalConverterWithoutCurrency } from "../../utils/funnctions/decimal";
import MoneyConverter from "./MoneyConverter";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const Profile = () => {
  const { user } = useAppSelector(authSelector);
  const [data, setData] = useState<any>(null);
  //React-router-dom
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.events && user.events.length > 0) {
      const tempData = {
        labels: user.events.map((item) =>
          formatDateToMDY(new Date(item.createdAt))
        ),
        datasets: [
          {
            fill: true,
            label: "Your porfolio",
            data: user.events.map((item) => item.porfolio),
            borderColor: "#3459e7",
            backgroundColor: "rgba(225, 232, 245,0.6)",
          },
        ],
      };
      setData(tempData);
    }
  }, [user?.events]);

  //Redux
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(userLogout())
      .then((data) => {
        const result = data.payload as DefaultResponse;
        if (result.success) {
         
          navigate("/");
          
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNavigateToCryptoDetail = (id: string) => {
    dispatch(setIsLoading(true));
    navigate(`/crypto/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            {user && (
              <div className={styles.container}>
                <div className="row">
                  <div className="col l-12 m-12 c-12">
                    <div className={styles.header}>
                      <div style={{ width: 1 }}></div>
                      <div className={styles.userProfile}>
                        <img
                          className={styles.userAvatar}
                          src={user.avatar}
                          alt=""
                        />
                        <h3 className={styles.userName}>{user.name}</h3>
                      </div>
                      <div className={styles.userController}>
                        <div
                          className={clsx("btn", styles.btnLogout)}
                          onClick={handleLogout}
                        >
                          Log out
                        </div>
                      </div>
                    </div>
                    <div className={styles.body}>
                      <h3 className={styles.title}>My Porfolio</h3>
                      <div className={styles.porfolio}>
                        <div className={styles.moneyType}>
                          USD:{" "}
                          <span className={styles.usd}>
                            ${decimalConverterWithoutCurrency(user.usd)}
                          </span>
                          <MoneyConverter type="USD" />
                        </div>
                        <div className={styles.moneyType}>
                          USDT:{" "}
                          <span className={styles.usdt}>
                            {decimalConverterWithoutCurrency(user.usdt)}{" "}
                          </span>{" "}
                          <MoneyConverter type="USDT" />
                        </div>
                        <h4 className={styles.title}>My Coins</h4>
                        <div className="row" style={{ marginBottom: 20 }}>
                          {user.coins &&
                            user.coins.length > 0 ? user.coins.map((item) => (
                              <div
                                className="col l-3 m-4 c-12"
                                key={item.coinId}
                                onClick={() => {
                                  handleNavigateToCryptoDetail(item.coinId);
                                }}
                              >
                                <div className={styles.coinItem}>
                                  <div className={styles.coinItemHeader}>
                                    <img src={item.avatar} />
                                    <h3
                                      className={styles.coinItemName}
                                    >{`${item.name}(${item.symbol})`}</h3>
                                  </div>
                                  <div className={styles.coinItemBody}>
                                    <p>
                                      Amount:{" "}
                                      <span>
                                        {decimalConverterWithoutCurrency(
                                          item.amount
                                        )}
                                      </span>
                                    </p>
                                    <p>
                                      Buy At:{" "}
                                      <span>
                                        {formatDateToMDY(
                                          new Date(item.createdAt)
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )) : <div className={styles.empty}>You holding no coins</div> 
                            }
                        </div>
                        {/* History */}
                        <div className="row">
                          <div className="col l-12 m-12 c-12">
                            <h3 className={clsx(styles.title, styles.history)}>
                              Activities
                            </h3>
                            {user.events && user.events.length>0 ?
                              <table className={styles.historyTable}>
                              <thead>
                                <tr>
                                  <th>Index</th>
                                  <th>Description</th>
                                  <th>Timestamp</th>
                                </tr>
                              </thead>
                              <tbody>
                                {user.events &&
                                  user.events.length > 0 &&
                                  [...user.events]
                                    .reverse()
                                    .map((item, index) => (
                                      <tr key={item.eventId}>
                                        <td>{index + 1}</td>
                                        <td>{item.description}</td>
                                        <td>
                                          {formatDateToMDY(
                                            new Date(item.createdAt)
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                             : <div className={styles.empty} style={{marginBottom:20,marginLeft:8}}>No activities</div>}
                            
                          </div>
                        </div>
                        <div className="row">
                          <div className="col l-12 m-12 c-12">
                            <div className={styles.chart}>
                              <h3 className={clsx(styles.title)}>
                                Balance Changing
                              </h3>
                              {user.events && user.events?.length>2 ? <>
                                {data && (
                                <Line
                                  style={{
                                    maxHeight: 436,
                                  }}
                                  options={options}
                                  data={data}
                                />
                              )}
                              </> : <div className={styles.empty} style={{marginLeft:8}}>No Balance Change</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Profile;
