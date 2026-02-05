# Changelog

## Performance Updates
- **Hero Animation Optimization**: Added `will-change: transform` to background blobs to force GPU layer promotion and reduce CPU usage during animation. reduced blur radius slightly to lower composition cost.
- **Image Optimization Script**: Created `scripts/optimize_images.js` to resize and compress large assets (requires check).

## Admin Features
- **Admin Dashboard**: Added a comprehensive dashboard at `/admin` for managing:
    - **Workshop Content**: Create, Edit, Deactivate workshops.
    - **Applications**: View a list of attendees who booked workshops.
    - **Custom Orders**: View incoming commission requests.
- **Interactive Forms**:
    - **Workshop Booking**: Replaced static WhatsApp links with a "Book a Spot" modal on the Workshop page.
    - **Commission Inquiry**: Replaced static links with a "Commission Inquiry" modal on the Custom Orders page.
    - Forms currently simulate submission (UI only).

## Visual Updates
- **Custom Orders Page Redesign**: Rebuilt `CustomOrdersPage.jsx` into a comprehensive "Service Viewer".
- **Workshop Page Redesign**: Rebuilt `WorkshopPage.jsx` into a comprehensive "Workshop Viewer".
- **Image Format**: Replaced all `.jpg` assets with optimized `.webp` format across the application.
- **Home Page**:
  - Replaced emojis in the "About" section with clean Lucide React icons.
  - Refined the "Gallery Teaser" image grid layout.
