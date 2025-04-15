import React from 'react';

const Page = () => {
    return (
        <div className="max-w-xl py-[5svh] mx-auto p-6 text-gray-800">
            <h1 className="text-xl !font-semibold mb-4 text-gray-700">Terms of Service</h1>
            <p className="mb-4 text-sm">Welcome to Movie Hunt. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use our website.</p>
            
            <h2 className="text-md !font-semibold mt-4 text-gray-700">Limitation of Liability</h2>
            <p className="mb-4 text-sm">We make no warranties about the accuracy or completeness of our content and are not liable for any damages arising from its use.</p>
            
            <h2 className="text-md !font-semibold mt-4 text-gray-700">Indemnification</h2>
            <p className="mb-4 text-sm">You agree to indemnify and hold us harmless from any claims or liabilities arising from your use of the website.</p>
            
            <h2 className="text-md !font-semibold mt-4 text-gray-700">Termination</h2>
            <p className="mb-4 text-sm">We reserve the right to suspend or terminate your access to our site at any time, for any reason.</p>
            
            <h2 className="text-md !font-semibold mt-4 text-gray-700">Changes to Terms</h2>
            <p className="mb-4 text-sm">We may update these terms at any time. Continued use of our site means you accept the changes.</p>
        </div>
    );
};

export default Page;

export const metadata = {
  title: "Movie Hunt - Terms of Services",
}