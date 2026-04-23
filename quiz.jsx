fetch(import.meta.env.VITE_API_URL)
  .then(res => res.json())
  .then(data => console.log(data));