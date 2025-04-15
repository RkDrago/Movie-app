import React from 'react';

const Page = () => {
    return (
        <div className="max-w-2xl py-[5svh] mx-auto p-6 text-gray-800">
            <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-4">This is Movie Hunt's Privacy Policy. This document explains our policies for the collection, use, and disclosure of personal information on our website.</p>
            
            <h2 className="text-lg font-semibold mt-6 mb-2">Collection of Data</h2>
            <p className="mb-4">Like many websites, we may automatically collect general information such as IP addresses, cookies, and server logs to enhance user experience.</p>
            
            <h2 className="text-lg font-semibold mt-6 mb-2">Use of Data</h2>
            <p className="mb-4">We use collected data to improve user experience. We do not share personal data unless:</p>
            <ul className="list-disc pl-5 mb-4">
                <li>It is outlined in this Privacy Policy.</li>
                <li>Consent is provided by the user.</li>
                <li>It is required by law or for security purposes.</li>
            </ul>
            
            <h2 className="text-lg font-semibold mt-6 mb-2">Cookies</h2>
            <p className="mb-4">We use cookies to personalize content and enhance user experience. You can disable cookies in your browser settings, but some features may not function properly.</p>
            
            <h2 className="text-lg font-semibold mt-6 mb-2">Third-Party Links</h2>
            <p className="mb-4">Our website may contain links to third-party sites. We are not responsible for their privacy practices and encourage users to read their policies.</p>
            
            <h2 className="text-lg font-semibold mt-6 mb-2">Changes to This Policy</h2>
            <p className="mb-4">We may update this policy from time to time. Continued use of our website constitutes acceptance of any modifications.</p>
            
            <p className="mt-6">For any questions, contact us at [your email].</p>
        </div>
    );
};

export default Page;


export const metadata = {
    title: "Movie Hunt - Privacy Policy",
  }