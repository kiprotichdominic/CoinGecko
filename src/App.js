import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { coinsSelector, fetchCoins } from './features/crypto/cryptoSlice';

function App() {
  const dispatch = useDispatch()
  const { coins, loading, hasErrors } = useSelector(coinsSelector)

  useEffect(() => {
    dispatch(fetchCoins())
  }, [dispatch])

  // error handling & map successful query data 
  const renderCoins = () => {
    if (loading) return <p>Loading Cryptos Currencies.....</p>
    if (hasErrors) return <p>Cannot display Crypto Currencies</p>
    console.log(coins);
    return (coins && coins?.map(item => (
      <div key={item.id}>
        <h2>{item.name}</h2>
        <img src={item.image} alt="" srcset="" />
      </div>
    )))
  }

  return (
    <div className="App">
      <h1>Coin Gecko</h1>
      {renderCoins()}
    </div>
  );
}

export default App;
