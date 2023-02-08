import { useState, useEffect } from "react";

//import du package axios
import axios from "axios";

import bannerwide from "../components/assets/images/bannerwide.jpg";

const Home = () => {
  const [data, setData] = useState();
  // State qui me sert à savoir si la data a été récupérée
  const [isLoading, setIsLoading] = useState(true);

  // La callback de mon useEffect va être appelée une seule fois au premier rendu de mon composant
  useEffect(() => {
    // Je déclare la focntion qui fait la requête
    const fetchData = async () => {
      // Ma requête peut échouer docn je la place dans un try catch
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        // Je stocke le résultat dans data
        setData(response.data);
        // Je fais paser isLoading à false
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // J'appelle ma fonction
    fetchData();
  }, []);

  // Tant que isLoading vaut true, j'affiche un indicateur de chargement
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main>
      <div className="megabanner-container">
        <img alt="Vinted megabanner" src={bannerwide} />
      </div>
      <div className="homeBaseline">
        Prêts à faire du tri dans vos placards ?
        <button className="sell-homebaseline">Commencer à vendre</button>
      </div>
      <section className="image-main-container">
        {data.offers.map((offer) => {
          console.log("offer : ", offer);
          return (
            <div className="image-single-container" key={offer._id}>
              <div className="username">{offer.owner.account.username}</div>
              <div className="product-image">
                <img
                  className="product-price"
                  alt={offer.product_name}
                  src={offer.product_image.url}
                />
              </div>
              <div>{offer.product_price} €</div>
              <div>{offer.product_details.TAILLE}</div>
              <div>{offer.product_details.MARQUE}</div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
