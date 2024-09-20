import { useEffect } from "react";
import { useState } from "react";
import ChartComponent from "./ChartComponent";


const CoinList = () => {
  const [coins, setCoins] = useState([]); //array de cryptomonedas obtenidas con la api
  const [coinHistory, setCoinHistory] = useState(null); //historial de moneda seleccionada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);  //moneda seleccionada
  const apiKey = 'IbMQQ4tP1Y5Lsc6avXn5mDRUNiU/8qy/csUp3wcFOtA=' 
  const [isPopupOpen, setIsPopupOpen] = useState(false); //state para controlar la visibilidad del Pop up con la grafica


    //fetch de la informacion
    useEffect(() => {
      const options = {
        method: 'GET',
        headers: { 
          accept: 'application/json', 
          'X-API-KEY': apiKey 
        }
      };
  
    fetch('https://openapiv1.coinstats.app/coins', options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCoins(data.result); // 'result' para que el resultado sean todos los campos
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
    }, []); // para que solo se haga el montaje de la información una vez


  //Mensaje de carga y de error 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


    //consulta de endpoint y fetch del histórico para coin seleccionada
    const fetchCoinHistory = (coinId) => {

      const options = {
        method: 'GET',
        headers: {'X-API-KEY': apiKey}
      };

      const apiUrl = `https://openapiv1.coinstats.app/coins/${coinId}/charts?period=1m`;
    
      fetch(apiUrl, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("Historical data:", data);
          setCoinHistory(data);
        })
        .catch((error) => {
          console.error("Error fetching historical data:", error);
        });
      };
    
    // Funcion para abrir pop-up
    const openPopup = () => {
      setIsPopupOpen(true);
    };

    // Funcion para cerrar pop-up
    const closePopup = () => {
      setIsPopupOpen(false);
    };

    //manejador de seleccion de coin y de pop-up
    const handleOpenPopup = (coin) => {
      fetchCoinHistory(coin.id); // Fetch historial de coin
      setSelectedCoin(coin); // seleccionar la coin
      openPopup(); // abrir pop-up
    };

    //Funcion para transformar informacion obtenida del historial, a un formato que la libreria Recharts pueda usar
    const transformedData = coinHistory ? coinHistory.map(item => ({
      date: new Date(item[0] * 1000).toLocaleDateString("en-GB"), // convierte a Date, y se pone en formato dd/mm/yyyy
      price: item[1], // el segundo elemento es el precio
    })) : [];

    return (
                <div className="container-fluid"  id="anchor_home">
                  <h1 className="text-center py-3">Lista Criptomonedas</h1>
                  <div className="row px-3">

                    {/* Se recorre el array obtenido y se dibuja la informacion en tarjetas */}
                    {coins.map((coin) => 
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3 px-2" key={coin.id}>
                      <div className="card">
                          <div className="row card-body">
                            <div className="col-4">
                              <img src={coin.icon} className="card-img p-0 m-0" alt={coin.name} />
                            </div>
                            <div className="col-8">
                                    <p className="card-text">{coin.name}</p>
                                    <p className="card-text"><b>${coin.price}</b></p>
                                    <button className="btn" style={{ background: "#f7931a" }} onClick={() => {handleOpenPopup(coin)}}>Histórico</button> {/* el botón me da dinamicamente el coin.id para el fetch y abre la ventana de la grafica */}
                            </div>
                        </div>
                      </div>
                    </div>
                    )
                    }

                    {/* contenido del Pop-up con grafica */}
                    {isPopupOpen && (
                    <div className="popup-overlay" onClick={closePopup}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Nombre de la moneda: {selectedCoin.name}</h2>
                        <br></br>
                        <hr></hr>
                        <p>Precio actual: ${selectedCoin.price}</p>

                        {/* Rendereado condicional, para que no renderee sin haberse seleccionado una coin antes */}
                        {coinHistory ? (
                            <div>
                            <h3>Precio Histórico:</h3>
                            <p>(Últimos 30 días)</p>
                            <ChartComponent data={transformedData} /> {/* generacion de grafica con libreria recharts */}
                            </div>
                        ) : (
                            <p>Loading precio histórico...</p>
                        )}
                        <button onClick={closePopup} className="btn close-button">Cerrar</button>
                        </div>
                    </div>
                    )}

                  </div>
                </div>
    );
  };
  
  export default CoinList;