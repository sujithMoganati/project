import React from "react";
import { WebView } from "react-native-webview";
import { getRazorpayHTML } from "@/components/razorpayCheckoutHTML";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function RazorpayPayment() {
  const router = useRouter();
  const { orderId, amount, name, email, phone } = useLocalSearchParams();

  const razorpayKey = "rzp_test_XjPAE6PIhtMZzr"; // Use your Razorpay test/live key

  const htmlContent = getRazorpayHTML(orderId, razorpayKey, Number(amount), {
    name: name?.toString(),
    email: email?.toString(),
    phone: phone?.toString(),
  });

  const onMessage = async (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (
      data?.razorpay_payment_id &&
      data?.razorpay_order_id &&
      data?.razorpay_signature
    ) {
      try {
        const res = await fetch(
          "https://shopngo-backend.onrender.com/orders/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: data.razorpay_order_id,
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_signature: data.razorpay_signature,
            }),
          }
        );

        const result = await res.json();

        if (res.ok) {
          router.replace("/profile/orders?newOrder=true");
        } else {
          alert("Payment verification failed");
          router.back();
        }
      } catch (err) {
        console.error("Verification error:", err);
        alert("Something went wrong during verification.");
        router.back();
      }
    } else if (data?.cancelled) {
      router.back();
    }
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      onMessage={onMessage}
      javaScriptEnabled
    />
  );
}
