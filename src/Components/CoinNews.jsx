import { useEffect } from "react";
import { useState } from "react";

const CoinNews = () => {
    

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = 'IbMQQ4tP1Y5Lsc6avXn5mDRUNiU/8qy/csUp3wcFOtA='

    // Se obtiene la Date actual y se pone en el formato que solicita la api
    const currentDate = new Date();
    const isoStringDate = currentDate.toISOString(); // ISO format 

    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 7); // se obtiene una segunda fecha dinamicamente
    const isoStringPrevDate = prevDate.toISOString();



    //fetch de la informacion
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            'X-API-KEY': apiKey 
            }
        };
    
        fetch(`https://openapiv1.coinstats.app/news?page=1&limit=8&from=${isoStringPrevDate}&to=${isoStringDate}`, options)
            .then((response) => {
            return response.json();
            })
            .then((response) => {
            setNews(response.result); // 'result' para que el resultado sean todos los campos
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError(err);
            setLoading(false);
        });
      }, []); // para que solo se haga el montaje una vez



  //Mensaje de carga y de error 
        if (loading) {
        return <div>Loading...</div>;
        }

        if (error) {
        return <div>Error: {error.message}</div>;
        }




    return (
        <div className="container-fluid" id="anchor_news">
            <h1 className="text-center py-3">Últimas Noticias</h1>
            <div className="row px-3">

                {news.map((n) => 
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3 px-2" key={n.id}>
                        <div className="text-center card-news px-2">
                            <div className="row card-body">
                                <div className="col p-0">
                                    <a href={n.sourceLink} target="_blank"><img src={n.imgUrl} className="card-img p-0 mb-3 img-fixed-height" alt={n.id}/></a>
                                    <p className="card-text px-3">{n.title}</p>
                                    <p className="card-text px-2">Fuente: {n.source}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>

)
}

export default CoinNews;