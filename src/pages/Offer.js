import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
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
    <p>Loading...🔥🔥🔥</p>
  ) : (
    <div className="offer-container">
      <img
        alt={data.product_name}
        className="offer-image"
        src={data.product_image.secure_url}
      />
      <div className="offer-text-container">
        <p>{data.product_price} €</p>
        {/* Je parcours product_details */}
        {data.product_details.map((detail, index) => {
          // Je récupère le nomde la clef de detail
          const key = Object.keys(detail)[0];
          // console.log(key);
          // console.log(detail[key]);
          return (
            <div key={index}>
              {/* J'affiche le nom dela clef  */}
              <span>{key} : </span>
              {/* et son contenu */}
              <span>{detail[key]}</span>
            </div>
          );
        })}
        <p>{data.product_name}</p>
        <p>{data.product_description}</p>
        <div>
          <div>
            {data.owner.account.avatar && (
              <img
                alt={data.owner.account.username}
                style={{
                  borderRadius: "50%",
                  height: 25,
                  width: 25,
                  objectFit: "cover",
                }}
                src={data.owner.account.avatar.secure_url}
              />
            )}
          </div>
          <p>{data.owner.account.username}</p>
        </div>

        <button className="sell-homebaseline">Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
