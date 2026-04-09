# Design System Specification

## 1. Overview & Creative North Star: "The Digital Sanctuary"
This design system rejects the "no-pain-no-gain" industrial aesthetic of traditional fitness apps. Instead, it follows a Creative North Star we call **"The Digital Sanctuary."** The goal is to create an environment that feels like a quiet morning in a sun-drenched garden—breathable, tactile, and profoundly human.

To move beyond "standard" UI, we utilize **Intentional Asymmetry** and **Tonal Depth**. We avoid rigid, centered grids in favor of organic layouts where elements drift slightly, overlapping like fallen leaves. This system replaces the aggressive "performance tracker" with a "well-being companion," using soft-focus containers and a scale-defying typography hierarchy to guide the user through their journey with a gentle hand.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the earth. It uses low-chroma greens and warm clays to lower the user's heart rate and remove the "urgency" typically associated with exercise.

### Palette Highlights
*   **Primary (`#526442`):** A grounded Moss Green for grounding elements.
*   **Primary Container (`#9CAF88`):** The signature Dusty Sage for supportive backgrounds.
*   **Secondary (`#9F402D`):** A muted Terracotta used sparingly for moments of soft encouragement.
*   **Surface/Background (`#FBFBE2` / `#F5F5DC`):** The "Oat" base that provides a warm, non-clinical canvas.

### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To define boundaries, designers must use background color shifts. A `surface-container-low` card sitting on a `surface` background provides all the definition a user needs. This mimics the way objects in the physical world are defined by light and shadow, not by ink outlines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of fine, heavyweight paper.
1.  **Base:** `surface` (#FBFBE2)
2.  **Sectioning:** `surface-container-low` (#F5F5DC)
3.  **Interactive Elements:** `surface-container-highest` (#E4E4CC)

### The Glass & Gradient Rule
For floating action buttons or high-level navigation, use **Glassmorphism**. Apply `surface-variant` at 60% opacity with a `backdrop-filter: blur(20px)`. To add "soul," use a subtle linear gradient on primary CTAs transitioning from `primary` to `primary_container`.

---

## 3. Typography: Editorial Empathy
The typography pairs **Plus Jakarta Sans** (Display/Headlines) with **Be Vietnam Pro** (Body/Labels). This combination offers high legibility with a soft, rounded character that feels modern yet approachable.

*   **Display Large (3.5rem):** Used for daily affirmations or milestone celebrations. Use `on_surface` with generous letter-spacing (-0.02em) to create an editorial, premium feel.
*   **Headline Medium (1.75rem):** Reserved for section titles. These should feel like headers in a high-end wellness magazine.
*   **Body Large (1rem):** Set with a generous line-height (1.6) to ensure the interface never feels "cramped" or overwhelming.
*   **Title Small (1rem):** Used for card headers, providing clear hierarchy without aggressive weighting.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "tech-heavy." We achieve depth through the **Layering Principle.**

*   **Ambient Shadows:** If a card must "float" (e.g., a modal), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(82, 100, 66, 0.06)`. Note the use of a tinted shadow (using the primary color) rather than neutral black.
*   **The "Ghost Border" Fallback:** For accessibility in high-glare environments, a 1px border is permitted only if set to `outline_variant` at **15% opacity**.
*   **Depth through Blur:** Use `surface_container_lowest` (#FFFFFF) for the most "elevated" items, creating a sense of natural highlights hitting the topmost layer of the interface.

---

## 5. Components

### Buttons
*   **Primary:** High roundedness (`full`). Use the Sage-to-Moss gradient. No shadows; use a 2px "inner glow" via a lighter top border at 20% opacity for a tactile, pill-like feel.
*   **Secondary:** `secondary_fixed_dim`. Soft Terracotta. Used for "Rest" or "Reflect" actions.
*   **Padding:** Oversized padding (e.g., `spacing-4` horizontally) to ensure the tap targets feel "plush."

### Cards & Lists
*   **The "No Divider" Rule:** Never use lines to separate list items. Use `spacing-3` of vertical white space or alternate between `surface_container` and `surface_container_low` backgrounds.
*   **Shape:** Use the `xl` (3rem) corner radius for large cards to maintain the "warm hug" organic aesthetic.

### Soft Progress Indicators
*   Avoid "harsh" ring charts. Use **Organic Progress Blobs**—thick, rounded lines (`roundedness: full`) that use the `primary_container` as the track and `primary` as the progress, with tapered ends to avoid a mechanical look.

### Input Fields
*   **State:** Backgrounds should be `surface_container_highest`. Upon focus, do not use a high-contrast border; instead, shift the background to `primary_fixed` (#D5E9BF) to softly "glow" the active field.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use asymmetrical layouts. Let illustrations overlap text containers by `spacing-2` to create depth.
*   **Do** prioritize "negative space." If a screen feels full, increase the spacing scale by one increment.
*   **Do** use the `primary_fixed` color for "Soft Success" states rather than a bright "Alert Green."

### Don't:
*   **Don't** use 100% black text. Use `on_surface` (#1B1D0E) for a softer, charcoal-ink look.
*   **Don't** use sharp 90-degree corners. Even the smallest tooltip must have at least `sm` (0.5rem) rounding.
*   **Don't** use "Pulse" animations that are too fast. All transitions should follow a `cubic-bezier(0.4, 0, 0.2, 1)` easing over 400ms to feel intentional and calm.