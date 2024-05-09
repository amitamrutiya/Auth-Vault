import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to-blue-900">
      {children}
    </div>
  );
}

export default AuthLayout;
