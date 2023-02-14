import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

// import Payment from "./Payment";

const Offer = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;
  console.log("id : ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
        // console.log("response.data : ", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading 🔥🔥🔥...</p>
  ) : (
    <div className="offer-container">
      <img
        alt={data.product_name}
        className="offer-image"
        src={data.product_image.secure_url}
      />
      <div className="offer-text-container">
        <p className="offer-price">{data.product_price} €</p>
        {/* Je parcours product_details */}
        {data.product_details.map((detail, index) => {
          // Je récupère le nom de la clef de detail
          const key = Object.keys(detail)[0];
          // console.log(key);
          // console.log(detail[key]);
          return (
            <div key={index}>
              <div className="offer-detail-main">
                {/* J'affiche le nom dela clef  */}
                <span className="offer-key">{key} : </span>
                {/* et son contenu */}
                <span className="offer-detail">{detail[key]}</span>
              </div>
            </div>
          );
        })}
        <p className="offer-line">&nbsp;</p>
        <p className="offer-name">{data.product_name}</p>
        <p className="offer-description">{data.product_description}</p>
        <div>
          <div className="offer-avatar-username">
            {data.owner.account.avatar && (
              <img
                alt={data.owner.account.username}
                style={{
                  borderRadius: "50%",
                  height: 50,
                  width: 50,
                  objectFit: "cover",
                }}
                src={data.owner.account.avatar.secure_url}
              />
            )}
            <p>{data.owner.account.username}</p>
          </div>
        </div>
        {token ? (
          <Link
            to="/payment"
            state={{
              title: data.product_name,
              price: data.product_price,
              name: data.owner.account.username,
            }}
          >
            <button className="sell-homebaseline">Acheter</button>
          </Link>
        ) : (
          <Link to="/Login">
            <button className="sell-homebaseline">Acheter</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Offer;
