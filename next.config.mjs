/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com',
        },
        {
          protocol: 'https',
          hostname: 'images.justwatch.com',
        },
        {
          protocol: 'https',
          hostname: 'musicart.xboxlive.com',
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
        },
        {
          protocol: 'https',
          hostname: 'dnm.nflximg.net',
        },
        {
          protocol: 'https',
          hostname: 'resizing.flixster.com',
        },
        {
          protocol: 'https',
          hostname: 'play-lh.googleusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
        },
        {
          protocol: 'https',
          hostname: 'images.moviesanywhere.com',
        },
      ],
    },
  };
  
  export default nextConfig;
  