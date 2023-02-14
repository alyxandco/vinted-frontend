import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import bannerwide from "../components/assets/images/bannerwide.jpg";
import tear from "../components/assets/images/tear.svg";

const Home = ({ search, setSearch, checked, setChecked, token }) => {
  const [data, setData] = useState();

  // State qui me sert à savoir si la data a été récupérée
  const [isLoading, setIsLoading] = useState(true);
  let priceSort = "";
  if (checked) {
    priceSort = "price-desc";
  }
  if (!checked) {
    priceSort = "price-asc";
  }

  // La callback de mon useEffect va être appelée une seule fois au premier rendu de mon composant
  useEffect(() => {
    // Je déclare la fonction qui fait la requête
    const fetchData = async () => {
      // Ma requête peut échouer donc je la place dans un try catch
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&sort=${priceSort}`
        );

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
  }, [search, checked, priceSort]);

  // Tant que isLoading vaut true, j'affiche un indicateur de chargement
  return isLoading ? (
    <p>Loading 🔥🔥🔥...</p>
  ) : (
    <main>
      <div className="megabanner-container">
        <img
          className="megabanner-image"
          alt="Vinted megabanner"
          src={bannerwide}
        />
        <img
          className="megabanner-image-overlay"
          alt="tear overlay"
          src={tear}
        />
      </div>
      <div className="homeBaseline">
        Prêts à faire du tri dans vos placards ?
        {token ? (
          <Link to="/Publish">
            <button className="sell-homebaseline">Commencer à vendre</button>
          </Link>
        ) : (
          <Link to="/Login">
            <button className="sell-homebaseline">Commencer à vendre</button>
          </Link>
        )}
      </div>
      <section className="image-main-container">
        {data.offers.map((offer, index) => {
          return (
            <Link to={`/offer/${offer._id}`} key={offer._id}>
              <div className="image-single-container">
                <div key={index} className="avatar-username">
                  {offer.owner.account.avatar && (
                    <img
                      alt={offer.owner.account.username}
                      style={{
                        borderRadius: "50%",
                        height: 25,
                        width: 25,
                        objectFit: "cover",
                      }}
                      src={offer.owner.account.avatar.secure_url}
                    />
                  )}

                  <div className="username">{offer.owner.account.username}</div>
                </div>
                <div className="product-image">
                  <img alt={offer.product_name} src={offer.product_image.url} />
                </div>
                <div className="product-price">{offer.product_price} €</div>
                <div className="product-details">
                  {offer.product_details[1].TAILLE}
                </div>
                <div className="product-details">
                  {offer.product_details[0].MARQUE}
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
