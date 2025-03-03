import React from "react";

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[url('/images/payment-background.png')] bg-cover min-h-screen bg-no-repeat">
      {children}
    </div>
  );
}
