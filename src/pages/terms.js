import React from "react";
import Disclamer from "@/components/Disclamer";

//TODO: move texts to constants, replace html tags with MUI components, move styles to STYLES object (use sx & MUI theme)

export default function Terms() {
  return <main style={{ maxWidth: '1000px', margin: 'auto', padding: '2rem', fontSize: '1rem' }}>

    <p style={{ textAlign: 'center' }}>
      By using this website, you agree to the following terms of service, privacy policy, and disclaimer:
    </p>
    <h2 style={{ textAlign: 'center' }}>
      <a href='/terms-of-service.pdf' target="_blank">
        Terms and Conditions
      </a>
    </h2>

    <h2 style={{ textAlign: 'center' }}>
      <a href='/privacy-policy.pdf' target="_blank">
        Privacy Policy
      </a>
    </h2>
    <h2 style={{ textAlign: 'center' }}>
      <a href='/disclaimer.pdf' target="_blank">
        Disclamer
      </a>
    </h2>
    <Disclamer />
  </main >
}
