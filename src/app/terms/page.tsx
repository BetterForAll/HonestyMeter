import React from "react";
import Disclamer from "@/components/Disclamer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - HonestyMeter",
  description: "Terms of Service, Privacy Policy, and Disclaimer for HonestyMeter",
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: "1000px", margin: "auto", padding: "2rem", fontSize: "1rem" }}>
      <p style={{ textAlign: "center" }}>
        By using this website, you agree to the following terms of service, privacy policy, and disclaimer:
      </p>
      <h2 style={{ textAlign: "center" }}>
        <a href="/terms-of-service.pdf" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline">
          Terms and Conditions
        </a>
      </h2>

      <h2 style={{ textAlign: "center" }}>
        <a href="/privacy-policy.pdf" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline">
          Privacy Policy
        </a>
      </h2>
      <h2 style={{ textAlign: "center" }}>
        <a href="/disclaimer.pdf" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline">
          Disclamer
        </a>
      </h2>
      <Disclamer />
    </main>
  );
}
