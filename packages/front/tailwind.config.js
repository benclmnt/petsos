module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      boxShadow: {
        orange: "0 2px 4px 0 rgba(232, 126, 4, 1)",
      },
    },
  },

  variants: {
    backgroundColor: ["responsive", "hover", "focus"],
  },

  plugins: [],
};
