import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export function PaymentForm({ clientSecret }: { clientSecret?: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message || "An error occurred");
        setProcessing(false);
      } else {
        // Here you would typically submit the paymentMethod.id to your server
        // and complete the payment there
        console.log("PaymentMethod created:", paymentMethod);
        setProcessing(false);
      }
    }
  };

  return (
    <div>
      <CardElement className="border p-3 rounded mb-4" />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSubmit}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}