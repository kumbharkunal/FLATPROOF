// The full-bleed 16:9 hero needs a wide, landscape screen: 1024px and up, and at least 3:2.
// Landscape tablets (5:4 to 3:2) get a two-column hero with the 4:5 image framed on the right;
// phones, portrait tablets and anything narrower get the stacked layout. Both use the 4:5 image,
// so the four findings are never cropped out of frame and no text sits over the room.
// Keep in sync with the hero media queries in src/app/globals.css.
export const HERO_WIDE = "(min-width: 1024px) and (min-aspect-ratio: 3/2)";
export const HERO_STACKED = `not all and ${HERO_WIDE}`;
