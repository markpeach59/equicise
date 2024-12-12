import { json, ActionFunctionArgs } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "~/components/PaymentForm";
import { createPaymentIntent} from "~/services/stripe.server"



// Initialize Stripe
const stripePromise = loadStripe("your_publishable_key_here");

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const paymentMethodId = formData.get("paymentMethodId");

  // Here you would typically create a Stripe PaymentIntent on your server
  // and return the client secret to the client
  // This is a simplified example
  const paymentIntent = await createPaymentIntent(paymentMethodId);

  return json({ clientSecret: paymentIntent.client_secret });
};

export default function Payment() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Payment Form</h1>
      <Elements stripe={stripePromise}>
        <Form method="post">
          <PaymentForm clientSecret={actionData?.clientSecret} />
        </Form>
      </Elements>
    </div>
  );
}

// This function would be implemented on your server
async function createPaymentIntent(paymentMethodId: string) {
  // Implement your server-side logic to create a PaymentIntent
  // This is just a placeholder
  return { client_secret: "placeholder_client_secret" };
}