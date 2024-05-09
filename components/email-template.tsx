import * as React from "react";

interface EmailTemplateProps {
  confirmLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  confirmLink,
}) => (
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
    <p style={{ textAlign: "center", color: "#6c757d", marginBottom: "1rem" }}>
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
);
