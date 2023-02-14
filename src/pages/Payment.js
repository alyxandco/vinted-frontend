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
  const { title, price } = location.state;
  return (
    <div>
      <span>{title}</span>
      <span>{price}</span>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} title={title} />
      </Elements>
    </div>
  );
};

export default Payment;
