import clsx from "clsx";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authSelector, setIsLoading } from "../../store/reducers/authSlice";
import { findAllUsersApi } from "../../utils/api/users";
import { getCoinNameFromList } from "../../utils/funnctions/getCoinNameFromList";
import { User } from "../../utils/types/api";
import styles from "./styles.module.scss";

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
import { formatDateToMDY } from "../../utils/funnctions/date";
import { decimalConverterWithoutCurrency } from "../../utils/funnctions/decimal";

export const options = {

  plugins: {
  
    title: {
      display: false,
    },
    scales:{
      
    }
  },
};

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
const AllUsers = () => {
  const [userList, setUserList] = React.useState<User[]>([]);
  const {user,isLoading} = useAppSelector(authSelector)

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    const callApi = async () => {
      const result = await findAllUsersApi();
      if (result.userList && result.userList.length > 0) {
        setUserList(result.userList);
    
      }
      if(isLoading) dispatch(setIsLoading(false))
    };
    callApi();
  }, []);


  return (
    <div className={styles.wrapper}>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className={styles.container}>
              <h2 className={styles.title}>All Users</h2>
              {/* <h3 className={styles.titleNotice}>(Realtime Updating)</h3> */}
              <div className={styles.tableInfo}>
                <table className={styles.table}>
                  <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Porfolio</th>
                    <th>Coins</th>
                    <th>Balance Chaging</th>
                  </tr>
                  </thead>
                  <tbody>
                  {userList.length > 0 &&
                    userList.map((item,index) => {
                        
                      const tempData = {
                        labels: item.events && item.events.map((item) =>
                          formatDateToMDY(new Date(item.createdAt))
                        ),
                        datasets: [
                          {
                            fill: false,
                            label: "Porfolio",
                            data: item.events && item.events.map((item) => item.porfolio),
                            borderColor: "#3459e7",
                            backgroundColor: "rgba(225, 232, 245,0.6)",
                          },
                        ],
                      };
                        
                      return (
                        <tr key={item.userId} className={clsx(styles.tableRowBody,user?.userId===item.userId && styles.onwer)}>
                          <td>#{index+1}</td>
                          <td className={styles.userInfo}>{item.userId===user?.userId ? <p>Onwer</p> : <>
                            <img src={item.avatar}/> <p>{item.name}</p></>}</td>
                          <td>
                            <p className={styles.porfolio}>USD : <span>{decimalConverterWithoutCurrency(item.usd)}</span></p>
                            <p className={styles.porfolio}>USDT : <span>{decimalConverterWithoutCurrency(item.usdt)}</span></p>
                          </td>
                          <td>{getCoinNameFromList(item.coins || [])}</td>
                          <td>
                          <Line
                                  style={{
                                    maxHeight: 100,
                                    width:'100%',
                                    maxWidth:320
                                  }}
                                  options={{
                                    responsive:true,
                                    
                                    scales:{
                                      y:{
                                        display:false
                                      },
                                      x:{
                                        display:false
                                      }
                                    }
                                  }}
                                  data={tempData}
                                />
                          </td>
                        </tr>
                      );
                    })}
                      </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
