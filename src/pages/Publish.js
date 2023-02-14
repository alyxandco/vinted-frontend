import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [trade, setTrade] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handlePublishOffer = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      // Je crée une nouvelle instance du constructeur FormData
      const formData = new FormData();
      // Je rajoute 3 paires clef/valeur à mon formdata
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      //   setImageToDisplay(response.data);
      if (response.status === 200) {
        navigate("/");
        console.log("statut : ", response.status);
        // J'affiche une alerte
        alert(`offre enregistrée 👍 !`);
      }
    } catch (error) {
      console.log(error.response.data);
      if (
        error.response.data.message === "title, price and picture are required"
      ) {
        setErrorMessage("Merci de remplir tous les champs obligatoires");
        alert(`Merci de remplir tous les champs obligatoires`);
      }
    }
  };

  return token ? (
    <div className="publish-container">
      <h1>Vends ton article </h1>
      <form onSubmit={handlePublishOffer}>
        <section className="publish-container-section first-section">
          <label htmlFor="picture" className="custom-file-upload">
            + Ajoute une photo
          </label>
          <input
            id="picture"
            name="picture"
            type="file"
            onChange={(event) => {
              // console.log(event.target.files[0]);
              setPicture(event.target.files[0]);
            }}
          />
          {/* {picture && (
            <img
              className="offerToPublishImage"
              src={URL.createObjectURL(picture)}
              alt="product"
            />
          )} */}
        </section>
        <section className="publish-container-section second-section">
          <article>
            <span>Titre</span>
            <input
              id="title"
              name="title"
              value={title}
              type="text"
              placeholder="ex: chemise verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </article>
          <article>
            <span>Décris ton article</span>
            <textarea
              id="description"
              name="description"
              value={description}
              type="text"
              rows="10"
              cols="63"
              placeholder="ex: porté quelquefois, taille ajustée"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </article>
        </section>
        <section className="publish-container-section third-section">
          <article>
            <span>Marque</span>
            <input
              id="brand"
              name="brand"
              value={brand}
              type="text"
              placeholder="ex: Zara"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </article>
          <article>
            <span>Taille</span>
            <input
              id="size"
              name="size"
              value={size}
              type="text"
              placeholder="ex: L /40 / 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </article>
          <article>
            <span>Couleur</span>
            <input
              id="color"
              name="color"
              value={color}
              type="text"
              placeholder="ex: rouge"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </article>
          <article>
            <span>Etat</span>
            <input
              id="condition"
              name="condition"
              value={condition}
              type="text"
              placeholder="ex: état d'usage"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </article>
          <article>
            <span>Lieu</span>
            <input
              id="city"
              name="city"
              value={city}
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </article>
        </section>
        <section className="publish-container-section fourth-section">
          <article>
            <span>Prix</span>
            <input
              id="price"
              name="price"
              value={price}
              type="text"
              placeholder="ex: 0.00"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </article>
          <article className="checkbox">
            <input
              id="trade"
              type="checkbox"
              name="trade"
              checked={trade}
              onChange={(event) => {
                setTrade(!trade);
              }}
            />
            <h3>Je suis intéressé par les échanges</h3>
          </article>
        </section>
        <section className="fifth-section">
          <button className="publish-button" type="submit">
            Ajouter
          </button>
          {errorMessage && <p className="errorMessage">{errorMessage} </p>}
        </section>{" "}
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default Publish;
