export const getRazorpayHTML = (
  orderId: string,
  key: string,
  amount: number, // Amount in INR
  user: {
    name?: string;
    email?: string;
    phone?: string;
  }
) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body>
      <script>
        document.addEventListener("DOMContentLoaded", function () {
          var options = {
            "key": "${key}",
            "amount": ${amount * 100},  // Convert INR to paise
            "currency": "INR",
            "name": "ShopNGO",
            "description": "Order Payment",
            "order_id": "${orderId}",
            "handler": function (response) {
              window.ReactNativeWebView.postMessage(JSON.stringify(response));
            },
            "prefill": {
              "name": "${user?.name || ""}",
              "email": "${user?.email || ""}",
              "contact": "${user?.phone || ""}"
            },
            "theme": {
              "color": "orange"
            },
            "modal": {
              "ondismiss": function () {
                window.ReactNativeWebView.postMessage(JSON.stringify({ cancelled: true }));
              }
            }
          };

          var rzp = new Razorpay(options);
          rzp.open();
        });
      </script>
    </body>
  </html>
`;
