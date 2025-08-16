import React from "react";

export default function Contact() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p>If you want to reach out, email me at: <a href="mailto:your-email@example.com" className="underline text-blue-400">your-email@example.com</a></p>
      <p>Or follow me on social media!</p>
      {/* Add your social links or a form here if you want */}
    </div>
  );
}
