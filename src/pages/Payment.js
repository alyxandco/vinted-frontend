import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

// Je me connecte à mon compte stripe en front en fournissant ma clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title, price, name } = location.state;

  const protectionFee = (price * 10) / 100;
  const protectionFeeToShow = ((price * 10) / 100).toFixed(2);

  const expeditionFee = (price * 20) / 100;
  const expeditionFeeToShow = ((price * 20) / 100).toFixed(2);

  const finalPrice = (price + protectionFee + expeditionFee).toFixed(2);
  console.log("price", price);
  console.log("protectionFee", protectionFee);
  console.log("expeditionFee", expeditionFee);
  console.log("finalPrice", finalPrice);
  return (
    <div className="payment-container">
      <section className="payment-section">
        <div className="payment-summary">
          <p>Résumé de la commande</p>
          <div>
            <article className="commande">
              <div>Commande </div>
              <div>{price} €</div>
            </article>
            <article className="commande">
              <div>Frais protection acheteurs </div>
              <div>{protectionFeeToShow} €</div>
            </article>
            <article className="commande">
              <div>Frais de port </div>
              <div>{expeditionFeeToShow} €</div>
            </article>
          </div>
        </div>
        <article>
          <div className="payment-total">Total</div>
          <div className="payment-total">{finalPrice} €</div>
        </article>

        <div className="payment-reassuring">
          <p>
            Il ne vous reste plus qu'un étape pour vous offrir{" "}
            <span>{title}</span>. Vous allez payer <span>{finalPrice} €</span>{" "}
            (frais de protection et frais de port inclus).
          </p>
        </div>
      </section>
      <section className="payment-modal">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={finalPrice} title={title} name={name} />
        </Elements>
      </section>
    </div>
  );
};

export default Payment;
