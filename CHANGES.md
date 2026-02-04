# Changelog

## Performance Updates
- **Hero Animation Optimization**: Added `will-change: transform` to background blobs to force GPU layer promotion and reduce CPU usage during animation. reduced blur radius slightly to lower composition cost.
- **Image Optimization Script**: Created `scripts/optimize_images.js` to resize and compress large assets (requires check).

## Visual Updates
- **Custom Orders Page Redesign**: Rebuilt `CustomOrdersPage.jsx` into a comprehensive "Service Viewer" with:
    - Dedicated sections for "Bespoke Dinnerware", "Personalized Gifting", and "Corporate/Restaurant" orders.
    - Info-rich cards showing Timeline, Minimum Order, and Features.
    - A new "How it Works" 4-step process section at the bottom.
    - Integrated logic for dynamic WhatsApp message links based on the specific service.
- **Workshop Page Redesign**: Rebuilt `WorkshopPage.jsx` into a comprehensive "Workshop Viewer" with:
    - Detailed cards for Wheel, Hand-building, Painting, and Private Parties.
    - Rich information layout (Duration, Group Size, Features).
    - Alternating layout for visual interest.
    - Premium responsive design with hover effects.
- **Image Format**: Replaced all `.jpg` assets with optimized `.webp` format across the application (Pottery, Products, Workshops).
- **Home Page**:
  - Replaced emojis in the "About" section with clean Lucide React icons (Compass, Heart, Sparkles).
  - Refined the "Gallery Teaser" image grid layout to be a cleaner, better-aligned masonry style with consistent spacing.
