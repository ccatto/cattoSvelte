

export async function get() {

    const data = await fetch(import.meta.env.VITE_ROBOTS_URL);
     const body = await data.text();
  
    const headers = {
      'Cache-Control': `max-age=0, s-max-age=${600}`,
      'Content-Type': 'text/html; charset=UTF-8',
    };
    return {
      body,
      headers,
    };
  }
  
  
  const render = () => `Disallow: /` 
  