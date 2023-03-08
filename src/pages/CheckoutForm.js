import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ price, title, name }) => {
  const stripe = useStripe();

  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);

      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: name,
      });

      const stripeToken = stripeResponse.token.id;
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(
        "https://site--vinted-backend--jnfnxpb8s78c.code.run/payment",
        {
          stripetoken: stripeToken,
          title: title,
          amount: price,
        }
      );
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="cardElement">
          <CardElement />
        </div>

        {completed ? (
          <div className="payment-completed">Merci pour votre achat</div>
        ) : (
          <div className="payment-completed">
            <button
              disabled={isLoading}
              type="submit"
              className="payment-button payment-completed"
            >
              Payer
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
