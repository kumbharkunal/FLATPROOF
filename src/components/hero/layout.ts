// The full-bleed 16:9 hero needs a wide, landscape screen: 1024px and up, and at least 5:4.
// Everything else (phones, tablets, a portrait iPad Pro) gets the stacked layout with the 4:5 crop,
// so the four findings are never cropped out of frame.
// Keep in sync with the hero media queries in src/app/globals.css.
export const HERO_WIDE = "(min-width: 1024px) and (min-aspect-ratio: 5/4)";
export const HERO_STACKED = `not all and ${HERO_WIDE}`;
