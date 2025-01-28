const APIDATA = {
  API_BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  IMAGE_w500_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  IMAGE_Backdrop_BASE_URL: 'https://image.tmdb.org/t/p/original',
  API_OPTIONS: {
    method: 'GET',
    headers: {
      accept: 'application/json',

      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  },
};

export default APIDATA;
