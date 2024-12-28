module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  // translate
  corePlugins: {
  //  translate: false,
  //  transform: false,
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      translate: ['active', 'group-hover'],
      transform: ['hover', 'focus'],
      ringColor: ['hover', 'active'],
    },
  },
  plugins: [],
}