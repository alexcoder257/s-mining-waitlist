import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[url('/images/background.png')] bg-cover min-h-screen bg-no-repeat">
      {children}
    </div>
  );
}
