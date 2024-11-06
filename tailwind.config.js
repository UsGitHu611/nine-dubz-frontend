/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens : {
      'laptop' : { max : '1230px' },
      'lg-mobile': { min : '625px', max : '768px' },
      'md-mobile': { max : '625px' },
      'sm-mobile': { max : '385px' },
    },
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
      },
      keyframes : {
        'mobile-menu' : {
          '0%' : {transform: 'translateY(100%)'},
          '100%' : {transform: 'translateY(0)'},
        }
      },
      animation : {
        'mobile-menu': 'mobile-menu .3s ease-in-out'
      },
      content: {
        'link-icon' : "url(@/assets/img/check.svg)"
      }
    },

  },
  plugins: [
    require('tailwindcss-animate'),
    require('@vidstack/react/tailwind.cjs')({
      prefix: 'media',
    }),
    customVariants
  ]
}

function customVariants({ addVariant, matchVariant, addComponents, matchUtilities }) {
  matchVariant('parent-data', (value) => `.parent[data-${value}] > &`);
  matchVariant('neighbor-variant', (value) => `&[${value}] ~ #${value}`);
  matchVariant('clamp', (value) => {
    let [min,preferred,max] = value.split(",");
    return `clamp(${min},${preferred},${max})`;
  });

  matchUtilities({
    transform: (value) => {
      let [rotateX, rotateY] = value.split(",");
      return {
        transform : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }
    }
  })

  addComponents({
    '.div-center': {
      position: 'absolute',
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)"
    }
  })

  addVariant('freeze-child', ['& > *']);
  addVariant('hocus', ['&:hover', '&:focus-visible']);
  addVariant('drag', ['&[drag]']);
  addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &']);
  addVariant('no-hover', ['@media(hover:none){&:hover}']);
  addVariant('check', ['&:has(*:checked)>img'])
  addVariant('parent-to-children', ['&:hover>*:first-child'])
}

