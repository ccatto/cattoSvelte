import node from '@sveltejs/adapter-node';
import staticAdapter from '@sveltejs/adapter-static';

const adapter =
  process.env.NODE_ENV === 'production'
    ? staticAdapter({ fallback: 'index.html' })
    : node();

const config = {
  kit: {
    adapter,

    paths: {
      base: ''
    },
    prerender: {
      // Implementing handleHttpError
      handleHttpError({ status, path, referrer, referenceType }) {
        console.log(`Handling HTTP error: ${status} on path: ${path}, referred from ${referrer} as a ${referenceType}`);
        if (status === 404) {
          return true; // Suppress the error
        }
      }
    }
  }
};

export default config;
