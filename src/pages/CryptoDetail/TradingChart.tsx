import React from 'react'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets'

const TradingChart = ({symbol} : {symbol : string}) => {
  return (
    <div>
        <AdvancedRealTimeChart
    theme="light"
    height={350}
    width="100%"
    symbol={`${symbol}USDT`}
    style="3"
    timezone="Asia/Ho_Chi-Minh"
    
  ></AdvancedRealTimeChart>
    </div>
  )
}

export default React.memo(TradingChart)