import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId =
  "AYxoNEnDWM79W8AugCBZmo4CwvoTPnWWCA-fXSWEOW1YUtTWHo6ES3Xv_IBfmdCXeC1GQYAIlVD8umCl";
const currency = "MXN";
const intent = "CAPTURE";
const clientSecret =
  "ECbZNK5oIJiIdeDhXYNHqRSxSjW_O4AFKpu_zMzFzzATU-_hzleatx83cZPDm1U_tN9Yk0jRbSgFD0UK";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(request: any) {
  // const form = await request.json();
  console.log("form: ", await request.json());
  return;
  try {
    // const form = await request.json();
    // console.log("form: ", form);

    const req = new paypal.orders.OrdersCreateRequest();
    req.requestBody({
      intent: intent,
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: form.amount,
          },
        },
      ],
    });

    const response = await client.execute(req);
    console.log(response);
    return NextResponse.json({ id: response.result.id });
  } catch (error: any) {
    console.error("Error creating order: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
