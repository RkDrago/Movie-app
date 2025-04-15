import React from 'react'

const Page = () => {
  return (
    <>
      <div className="max-w-2xl mx-auto text-center py-16 px-6 text-[#111]">
        <h1 className="text-xl !font-bold mb-4">Movie Hunt</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Movie Hunt is an open collection of stunning movie posters, TV series artworks, and show banners,
          designed to help movie lovers explore and organize their next watchlist. What started as a small passion project
          to curate visually striking film posters has now grown into a go-to resource for cinephiles worldwide.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Who creates the collections?</h2>
        <p className="text-gray-600 mb-8 text-sm">
          You do! Movie Hunt is an open platform where users can browse, save, and curate their own collections
          of movie and TV show posters. Whether you&apos;re a fan of classic cinema, binge-worthy series, or hidden indie gems,
          you can build and share your personalized watchlist with others.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Which posters get featured?</h2>
        <p className="text-gray-600 mb-8 text-sm">
          While Movie Hunt is open to all, it is also curated to maintain quality and relevance. Our team hand-picks standout
          movie posters and TV artworks that capture the essence of storytelling and visual creativity. Each day, a featured
          collection is showcased on the homepage.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Made for Movie Lovers</h2>
        <p className="text-gray-600 mb-8 text-sm">
          Movie Hunt was founded by passionate film enthusiasts who believe in the power of storytelling and visual design.
          Since its inception, our mission has been to create a space where movie fans can explore, collect, and get inspired by cinema.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Partnerships/Sponsorships</h2>
        <p className="text-gray-600 text-sm">
          For collaborations, inquiries, or sponsorship opportunities, reach out to us at
          <a href="mailto:hello@moviehunt.com" className="text-blue-500 hover:underline"> hello@moviehunt.com</a>.
        </p>
      </div>
    </>
  );
};

export default Page


export const metadata = {
  title: "Movie Hunt - About",
}