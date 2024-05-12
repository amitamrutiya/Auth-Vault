import * as React from "react";

interface EmailTemplateProps {
  confirmLink?: string;
  resetLink?: string;
  token?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  confirmLink,
  resetLink,
  token,
}) =>
  confirmLink ? (
    <div style={{ backgroundColor: "#f8f9fa", padding: "1rem" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#007bff",
          marginBottom: "1rem",
        }}
      >
        Welcome!
      </h1>
      <h3
        style={{
          fontSize: "1.25rem",
          textAlign: "center",
          color: "#6c757d",
          marginBottom: "1rem",
        }}
      >
        Thank you for signing up.
      </h3>
      <p
        style={{ textAlign: "center", color: "#6c757d", marginBottom: "1rem" }}
      >
        Please verify your email by clicking the link below:
      </p>
      <div style={{ textAlign: "center" }}>
        <a
          href={confirmLink}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            textDecoration: "none",
          }}
        >
          Verify Email
        </a>
      </div>
    </div>
  ) : resetLink ? (
    <div style={{ backgroundColor: "#f8f9fa", padding: "1rem" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#007bff",
          marginBottom: "1rem",
        }}
      >
        Reset Password
      </h1>
      <h3
        style={{
          fontSize: "1.25rem",
          textAlign: "center",
          color: "#6c757d",
          marginBottom: "1rem",
        }}
      >
        You requested to reset your password.
      </h3>
      <p
        style={{ textAlign: "center", color: "#6c757d", marginBottom: "1rem" }}
      >
        Please reset your password by clicking the link below:
      </p>
      <div style={{ textAlign: "center" }}>
        <a
          href={resetLink}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            textDecoration: "none",
          }}
        >
          Reset Password
        </a>
      </div>
    </div>
  ) : (
    <div style={{ backgroundColor: "#f8f9fa", padding: "1rem" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#007bff",
          marginBottom: "1rem",
        }}
      >
        Two Factor Authentication
      </h1>
      <h3
        style={{
          fontSize: "1.25rem",
          textAlign: "center",
          color: "#6c757d",
          marginBottom: "1rem",
        }}
      >
        You requested to enable two-factor authentication.
      </h3>
      <p
        style={{ textAlign: "center", color: "#6c757d", marginBottom: "1rem" }}
      >
        Your two-factor authentication code is: {token}
      </p>
    </div>
  );
