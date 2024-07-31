/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'media-brand': 'rgb(var(--media-brand) / <alpha-value>)',
        'media-focus': 'rgb(var(--media-focus) / <alpha-value>)',
        'container': "rgb(0 0 0 / 0.2)",
        'movie-card': "rgb(255 255 255 / 0.1)",
        'interactive': "rgb(255 255 255 / 5%)"
      },
      gridTemplateColumns: {
        'grid-with-button': 'auto 1fr'
      }
    },

  },
  plugins: [
    require('tailwindcss-animate'),
    require('@vidstack/react/tailwind.cjs')({
      prefix: 'media',
    }),
    customVariants,
  ],

}

function customVariants({ addVariant, matchVariant }) {
  // Strict version of `.group` to help with nesting.
  matchVariant('parent-data', (value) => `.parent[data-${value}] > &`);

  addVariant('hocus', ['&:hover', '&:focus-visible']);
  addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &']);
}

