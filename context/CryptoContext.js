import React, { createContext, useState } from "react";

const CoinsList = createContext();

const CryptoContextProvider = ({ children }) => {
  const [active, setActive] = useState("WatchList");
  const [filter, setFilter] = useState("Hot");
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteCoins, setFavoriteCoins] = useState([{"24hVolume": "11054100204", "btcPrice": "1", "change": "1.09", "coinrankingUrl": "https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc", "color": "#f7931A", "iconUrl": "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg", "listedAt": 1330214400, "lowVolume": false, "marketCap": "559104811644", "name": "Bitcoin", "price": "29090.252036874732", "rank": 1, "sparkline": ["28812.311930172185", "28929.995755244367", "28985.622075077048", "28956.413580520217", "28901.385764942457", "28938.071857304458", "28952.537371953425", "28943.972094898265", "29036.444591020703", "29025.614617134448", "28940.794370281743", "28919.077892179215", "28954.478438409966", "28994.25013811395", "28990.995487688273", "28978.906886902536", "28922.51648424712", "28910.22664203171", "28888.852545224378", "28931.417268935187", "28979.931858556818", "29016.6962882117", "29087.12109255836", "29100.306276603405"], "symbol": "BTC", "tier": 1, "uuid": "Qwsogvtv82FCd"}, {"24hVolume": "7213227933", "btcPrice": "0.06621956465643342", "change": "2.07", "coinrankingUrl": "https://coinranking.com/coin/razxDUgYGNAdQ+ethereum-eth", "color": "#3C3C3D", "iconUrl": "https://cdn.coinranking.com/rk4RKHOuW/eth.svg", "listedAt": 1438905600, "lowVolume": false, "marketCap": "235092790281", "name": "Ethereum", "price": "1926.3438256277702", "rank": 2, "sparkline": ["1887.95918879761", "1895.6142705487077", "1907.6780164788443", "1906.0421822302883", "1903.0013921745012", "1902.0641670857322", "1903.0546657941238", "1903.7124384885194", "1912.021876093663", "1906.3704794740713", "1901.4012538886843", "1899.878811847386", "1904.4187422491032", "1907.207393721027", "1909.4132974254708", "1912.3523523919062", "1910.448446817594", "1908.6315239450605", "1906.8886152487332", "1910.4925745690316", "1916.5586761499496", "1921.2565544869221", "1929.8183385332754", "1926.731836533402"], "symbol": "ETH", "tier": 1, "uuid": "razxDUgYGNAdQ"}, {"24hVolume": "18067032418", "btcPrice": "0.00003451708735261", "change": "0.13", "coinrankingUrl": "https://coinranking.com/coin/HIVsRcGKkPFtW+tetherusd-usdt", 
"color": "#22a079", "iconUrl": "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg", "listedAt": 1420761600, "lowVolume": false, "marketCap": "65631371995", "name": "Tether USD", "price": "1.0041107706662504", "rank": 3, "sparkline": ["1.0029395996588735", "1.0020949155582488", "1.0040385685654472", "1.0048208472611475", "1.0054504092544299", "1.0043838357420622", "1.003940205959861", "1.0035643894262642", "1.0030876583362724", "1.0053037891263301", "1.0053188202955057", "1.0036137631548232", "1.0034787408123924", "1.0034084150846405", "1.0025238577442646", "1.00272213565296", "1.0035764062396166", "1.0030909017201317", "1.0025540318560133", "1.0014458667514745", "1.001909255055612", "1.0019681038218256", "1.0047236509023398", "1.0071127627298198"], "symbol": "USDT", "tier": 1, "uuid": "HIVsRcGKkPFtW"}, {"24hVolume": "303511927", "btcPrice": "0.011198708279530019", "change": "0.93", "coinrankingUrl": "https://coinranking.com/coin/WcwrkfNI4FUAe+bnb-bnb", "color": "#e8b342", "iconUrl": "https://cdn.coinranking.com/B1N19L_dZ/bnb.svg", "listedAt": 1503014400, "lowVolume": false, "marketCap": "46525454067", "name": "BNB", "price": "325.77324633896404", "rank": 4, "sparkline": ["322.84257238799376", "323.8290847116049", "324.7141832914341", "324.9551447119153", "324.3753561423585", "324.2633960932654", "323.7750929243621", "323.2401461509878", "323.95043435806474", "324.6820858748008", "324.3441651047264", "324.2960036416244", "324.4125806996634", "324.72344790768733", "324.63040223439975", "324.876257762866", "325.0111373425246", "324.80893442122675", "324.53102401675875", "324.3567991089685", "324.9451688497877", "325.55967274762855", "326.22142147312303", "326.4793277014335"], "symbol": "BNB", "tier": 1, "uuid": "WcwrkfNI4FUAe"}]);
  const [coins, setCoins] = useState([])


  const value = {
    active,
    setActive,
    filter,
    setFilter,
    isLoading,
    setIsLoading,
    favoriteCoins,
    setFavoriteCoins,
    coins,
    setCoins,
  };

  return <CoinsList.Provider value={value}>{children}</CoinsList.Provider>;
};

export { CryptoContextProvider, CoinsList };