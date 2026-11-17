# Image prompts: FlatProof homepage

Eight AI images for the homepage. Each prompt below is complete on its own: open a **new** ChatGPT chat, paste one code block, download the result.

**How to add them to the site**
1. Save each download into `images-inbox/` with the exact filename shown above its prompt (`.png`, or `.webp` if that's what ChatGPT gives you).
2. Run `npm run images`. It cuts every image into the sizes the site serves (AVIF and WebP), and the site picks them up on the next build.
3. Tell me "images added". I'll look at the two hero photos and line up the four defect markers (damp skirting, socket, hollow tile, window sill) with what's actually in the frame.

Until a file exists, its slot shows a designed placeholder, so the site never looks broken.

The ninth image, the window-sill case photo, is real: I crop it from your reference screenshot of the Instagram post.

---

## 1. Hero, desktop

`hero-desktop.png` · 16:9 · 2560 × 1440 px · Hero background on tablets and desktops (the thermal lens scans this photo)

```text
Create a photorealistic interior photograph of an empty, brand-new apartment living room in Pune, India, on the day the owners take possession. The flat is finished but completely unfurnished and spotless.

Composition, landscape 16:9. The camera stands at eye level (about 150 cm high) in one corner of the room and looks diagonally across it, so we see three surfaces: a left wall, a back wall and a right wall, plus the floor.
- Left 40 percent of the frame: a plain, smooth, evenly lit off-white painted wall with absolutely nothing on it (no switches, no windows, no art, no shadows of objects). This area must stay calm and empty, because a headline will be placed over it.
- Back wall, centre to right: a wide white UPVC sliding window with two glass panes and slim frames. Directly under the window frame sits a polished black granite window sill, clearly visible, at about 45 percent of the frame height measured from the top. Through the glass, softly out of focus: a few modern residential high-rise towers and green trees under a clear morning sky.
- Right wall, right third of the frame: one white Indian modular switchboard plate mounted at about 55 percent of the frame height from the top. The plate has four small rocker switches and one round three-pin 16 A power socket. It must be sharp and clearly readable as a switchboard.
- Skirting: a 10 cm tall tile skirting runs along the bottom of the right wall and the back wall. It must be clearly visible in the lower-right quarter of the frame.
- Floor: large glossy light-beige vitrified floor tiles, 800 x 800 mm, with thin straight grout lines, filling the bottom quarter of the frame. One complete tile in the lower-right foreground must be fully visible.

Art direction: photoreal, natural daylight, cool clean whites with no warm or yellow cast, gentle soft shadows, the honest look of a real new Pune apartment (vitrified tiles, UPVC sliding window, granite sill, Indian modular switchboard, high-rise view). No people and no furniture. Calm, airy and aspirational, like the first walk-through of a new home.

Camera and light: full-frame camera, 24 mm lens, f/8, ISO 200, tripod at eye level, vertical lines kept straight (two-point perspective corrected), soft daylight coming through the window, no flash.

Size: aspect ratio 16:9, 2560 x 1440 pixels. If this exact size isn't available, use the largest available size at this aspect ratio — no cropping, no letterboxing.

Output format: PNG.

Avoid: any text, logos or watermarks; people; furniture, curtains or decorations; visible cracks, stains or damage (the room must look perfect); warped or curved lines; fisheye distortion; HDR halos; lens flare; plastic or glossy AI look; oversaturated colours.
```

---

## 2. Hero, mobile

`hero-mobile.png` · 4:5 · 1600 × 2000 px · Hero photo on phones, shown below the headline (the thermal lens scans this photo)

```text
Create a photorealistic interior photograph of an empty, brand-new apartment room in Pune, India, on the day the owners take possession. The flat is finished, unfurnished and spotless.

Composition, portrait 4:5. The camera stands at eye level and faces a room corner, so the back wall and the right wall meet in the frame, with the floor below.
- Top third: a white UPVC sliding window with slim frames on the back wall. Directly under it, a polished black granite window sill, clearly visible, at about 30 percent of the frame height measured from the top. Through the glass, softly out of focus: modern residential high-rise towers and trees.
- Middle, right side: one white Indian modular switchboard plate on the right wall at about 55 percent of the frame height from the top, with four small rocker switches and one round three-pin 16 A power socket. Sharp and clearly readable as a switchboard.
- Lower right: a 10 cm tall tile skirting running along the bottom of the right wall and the back wall, clearly visible at about 75 to 80 percent of the frame height.
- Bottom fifth: large glossy light-beige vitrified floor tiles, 800 x 800 mm, with thin straight grout lines. One complete tile near the bottom centre must be fully visible.
- Keep the top-left area simple (plain wall and ceiling), with no extra objects.

Art direction: photoreal, natural daylight, cool clean whites with no warm or yellow cast, soft shadows, the honest look of a real new Pune apartment (vitrified tiles, UPVC sliding window, granite sill, Indian modular switchboard, high-rise view). No people and no furniture. Calm, airy and aspirational.

Camera and light: full-frame camera, 24 mm lens, f/8, ISO 200, tripod at eye level, vertical lines kept straight, soft daylight from the window, no flash.

Size: aspect ratio 4:5, 1600 x 2000 pixels. If this exact size isn't available, use the largest available size at this aspect ratio — no cropping, no letterboxing.

Output format: PNG.

Avoid: any text, logos or watermarks; people; furniture, curtains or decorations; visible cracks, stains or damage (the room must look perfect); warped or curved lines; fisheye distortion; HDR halos; lens flare; plastic or glossy AI look; oversaturated colours.
```

---

## 3. Engineer with a thermal camera

`engineer-thermal.png` · 3:2 · 2400 × 1600 px · "How it works" step 2, and the water-leak service

```text
Create a photorealistic photograph of an Indian civil engineer inspecting a brand-new, empty apartment in Pune, India, with a handheld thermal imaging camera.

Subject: a woman engineer in her late twenties, natural Indian skin with real texture and pores, hair tied back neatly, focused expression. She wears a navy blue work polo shirt with a thin teal stripe on the collar and dark trousers, no logo. She kneels on one knee and points a compact pistol-grip thermal camera at the bottom of a freshly painted off-white wall, right where the wall meets the tile skirting. The small screen on the back of the camera shows a colourful thermal image in purple, orange and yellow, with no readable text or numbers.

Composition, landscape 3:2: the engineer in the right half of the frame, seen in three-quarter profile; the wall and skirting she is scanning in the left and centre; glossy light-beige vitrified floor tiles in the foreground. Leave calm, empty wall space in the upper left third. Natural daylight from a white UPVC window out of frame on the left.

Art direction: photoreal, natural daylight, cool clean whites, navy and teal only in her clothing, the honest look of a real new Pune apartment (vitrified tiles, tile skirting, off-white walls). Professional and calm, not posed like a stock photo.

Camera and light: full-frame camera, 35 mm lens, f/2.8, ISO 400, eye level slightly above the subject, soft window light with gentle falloff, shallow depth of field with the thermal camera and her hands in sharp focus.

Size: aspect ratio 3:2, 2400 x 1600 pixels. If this exact size isn't available, use the largest available size at this aspect ratio — no cropping, no letterboxing.

Output format: PNG.

Avoid: any text, logos or watermarks; readable text or numbers on the camera screen; distorted or extra fingers; plastic skin; glossy AI look; hard hats and high-visibility vests; staged smiling at the camera; warm yellow cast.
```

---

## 4. Hollow-tile tap test

`tap-test.png` · 4:5 · 1600 × 2000 px · "How it works" step 1, and the pre-possession service

```text
Create a photorealistic close-up photograph of a hollow-tile tap test in a brand-new apartment in Pune, India.

Subject: the hand of an Indian engineer, natural skin with real texture, holding a small steel tile-tapping tool (a slim metal rod with a small ball at the tip) and tapping the corner of a large glossy light-beige vitrified floor tile, 800 x 800 mm. The engineer's navy blue sleeve with a thin teal cuff is visible at the wrist. The other hand rests flat on the neighbouring tile.

Composition, portrait 4:5: shot from above at about 45 degrees. The tapping tool and the tile corner sit in the lower third of the frame and are pin-sharp. Grout lines run diagonally through the frame. The upper half shows more floor tiles fading softly out of focus toward a white wall and tile skirting. Keep the top area calm.

Art direction: photoreal, natural daylight, cool clean whites, navy and teal only in the sleeve, the honest look of a real new Pune apartment (glossy vitrified tiles, thin grout lines, tile skirting). Quiet and precise, like a detail shot from an engineering report.

Camera and light: full-frame camera, 50 mm macro lens, f/4, ISO 200, soft daylight from the side giving a gentle sheen on the tiles, no flash.

Size: aspect ratio 4:5, 1600 x 2000 pixels. If this exact size isn't available, use the largest available size at this aspect ratio — no cropping, no letterboxing.

Output format: PNG.

Avoid: any text, logos or watermarks; distorted or extra fingers; hammers or heavy tools; cracked or broken tiles; plastic skin; glossy AI look; warm yellow cast.
```

---

## 5. Laser measurement

`laser-measure.png` · 3:2 · 2400 × 1600 px · Carpet-area section, and the carpet-area measurement service

```text
Create a photorealistic photograph of carpet-area measurement in an empty, brand-new apartment room in Pune, India.

Subject: a handheld laser distance meter (a compact device with a navy body and a small dark screen) resting against the base of one wall at floor level. A thin, straight red laser line crosses the empty room just above the floor and ends in a small bright red dot on the opposite wall. The meter's screen shows blurred digits that cannot be read.

Composition, landscape 3:2: the laser meter in the lower-left foreground, sharp; the red beam runs diagonally across the frame to the red dot on the far right wall. The room has off-white walls, a tile skirting, glossy light-beige vitrified floor tiles and a white UPVC sliding window with a black granite sill on the back wall, with modern high-rise towers outside. Keep the upper half of the frame calm and uncluttered.

Art direction: photoreal, natural daylight, cool clean whites, navy only on the device, the honest look of a real new Pune apartment (vitrified tiles, UPVC window, granite sill, high-rise view). Precise and quiet, like a measurement photo in an engineering report.

Camera and light: full-frame camera, 28 mm lens, f/5.6, ISO 400, low camera position about 40 cm above the floor, soft daylight from the window; the laser beam faintly visible in the air.

Size: aspect ratio 3:2, 2400 x 1600 pixels. If this exact size isn't available, use the largest available size at this aspect ratio — no cropping, no letterboxing.

Output format: PNG.

Avoid: any text, logos or watermarks; readable numbers on the screen; people; furniture; tape measures; sci-fi glowing effects; exaggerated laser beams; plastic or glossy AI look; warm yellow cast.
```

---

## 6. Couple at handover

`handover-couple.png` · 4:5 · 1600 × 2000 px · Final call to action, and the rental-inspection service

```text
Create a photorealistic photograph of a young Indian couple in their bright new apartment in Pune, India, on handover day, relieved and quietly happy.

Subjects: a couple in their early thirties, natural Indian skin with real texture, genuine soft smiles, relaxed shoulders. The woman wears a teal cotton kurta and holds a small set of new flat keys; the man wears a navy shirt and holds a phone showing a document (blurred, unreadable), and they look at it together. They stand close, natural and unposed.

Composition, portrait 4:5: the couple in the lower two thirds of the frame, slightly right of centre, framed from the waist up. Behind them, a large white UPVC sliding window with a black granite sill, and modern high-rise towers and trees outside, softly out of focus. Glossy vitrified floor and off-white walls. Keep the upper left of the frame calm, open and light.

Art direction: photoreal, natural daylight, cool clean whites, navy and teal only in their clothes, the honest look of a real new Pune apartment (UPVC window, granite sill, high-rise view, vitrified tiles). Warm in mood but cool and clean in colour. Not a stock-photo pose.

Camera and light: full-frame camera, 50 mm lens, f/2, ISO 200, eye level, soft daylight from the window behind and to the side, gentle fill on their faces, shallow depth of field.

Size: aspect ratio 4:5, 1600 x 2000 pixels. If this exact size isn't available, use the largest available size at this aspect ratio — no cropping, no letterboxing.

Output format: PNG.

Avoid: any text, logos or watermarks; readable text on the phone; distorted hands or extra fingers; exaggerated grins or thumbs-up; looking into the camera; plastic skin; glossy AI look; heavy makeup; warm yellow cast.
```

---

## 7. Crack diagnosis

`crack-diagnosis.png` · 1:1 · 2000 × 2000 px · The consultancy service

```text
Create a photorealistic close-up photograph of an engineer measuring a crack in a plastered wall in a Pune apartment.

Subject: a fine hairline crack running diagonally across a smooth off-white plastered wall. The hand of an Indian engineer, natural skin with real texture, holds a small transparent plastic crack-width gauge card flat against the wall next to the crack. The card shows only simple printed lines of different thicknesses, with no readable text or numbers. A navy sleeve with a thin teal cuff is visible at the wrist.

Composition, square 1:1: the crack enters from the upper left and leaves at the lower right; the gauge card and fingertips sit just right of centre, pin-sharp; the rest of the wall falls softly out of focus. Plenty of calm wall space around the subject.

Art direction: photoreal, natural daylight, cool clean whites, navy and teal only in the sleeve, the honest texture of fresh Indian plaster and emulsion paint. Precise and quiet, like a detail shot from an engineering report.

Camera and light: full-frame camera, 100 mm macro lens, f/5.6, ISO 200, raking daylight from the left so the crack and plaster texture read clearly, no flash.

Size: aspect ratio 1:1, 2000 x 2000 pixels. If this exact size isn't available, use the largest available size at this aspect ratio — no cropping, no letterboxing.

Output format: PNG.

Avoid: any text, logos or watermarks; readable text or numbers on the gauge; dramatic wide cracks or crumbling walls; distorted or extra fingers; plastic skin; glossy AI look; warm yellow cast.
```

---

## 8. Construction site

`construction-site.png` · 4:5 · 1600 × 2000 px · The building construction service. An illustration of the work, not a VP Constructions project: it stays until real project photos arrive.

```text
Create a photorealistic photograph of a site engineer checking steel reinforcement on a residential building site in Pune, India.

Subject: an Indian site engineer in a white hard hat, a navy work shirt with a thin teal trim and a high-visibility vest, seen from the side at chest height, holding a steel measuring tape against the vertical reinforcement bars of a concrete column before the formwork closes. Natural skin with real texture, a focused expression, relaxed and correct hands. Behind, softly out of focus: the concrete frame of a mid-rise residential building under construction, with plywood formwork, steel props and a clear morning sky.

Composition, portrait 4:5: the engineer and the reinforcement cage fill the middle and right of the frame, pin-sharp; the left third shows the soft background of the concrete frame. No crowd and no machinery in the foreground.

Art direction: photoreal, natural daylight, the cool whites and greys of fresh concrete and steel, navy and teal only in the clothing, real Indian site details (binding wire, cover blocks, scaffolding). Calm, precise and professional, like a photo from a site inspection report.

Camera and light: full-frame camera, 50 mm lens, f/2.8, ISO 200, soft morning daylight from the left, no flash.

Size: aspect ratio 4:5, 1600 x 2000 pixels. If this exact size isn't available, use the largest available size at this aspect ratio, with no cropping and no letterboxing.

Output format: PNG.

Avoid: any text, logos, company names, signboards or watermarks; readable text on the hard hat, vest or tape; unsafe practices on site; dust, mess or drama; distorted or extra fingers; plastic skin; glossy AI look; warm yellow cast.
```