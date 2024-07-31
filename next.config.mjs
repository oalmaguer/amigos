/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/addpet',
      //   permanent: false,
      // },
      // {
      //   source: '/',
      //   destination: '/lista-adopt',
      //   permanent: false,
      // },

    ]
  },
    images: {
        domains: ['typoamhjuylsgwfpsroq.supabase.co'],
      },
};

export default nextConfig;
