# Asset Requirements for Crazy Garage Website

## Directory Structure
```
assets/
├── hero/           # Hero section background and featured images
├── gallery/        # Before/After comparison images
│   ├── car-polish/
│   ├── headlights/
│   └── interior/
├── testimonials/   # Client testimonial photos
├── videos/         # Video content and demonstrations
├── logo/          # Company logos and branding assets
└── images/        # General website images
```

## Image Requirements

### Hero Section (`hero/`)
- Main background image: 1920x1080px, dark/professional atmosphere
- Format: JPG/WebP
- File name: `hero-bg.jpg`

### Gallery (`gallery/`)
- Before/After images: 800x600px
- Format: JPG/WebP
- Naming convention: `[service]-[number]-before.jpg` and `[service]-[number]-after.jpg`
- Example: `car-polish-1-before.jpg`, `car-polish-1-after.jpg`

### Testimonials (`testimonials/`)
- Client photos: 200x200px
- Format: JPG/WebP
- Naming convention: `testimonial-[number].jpg`
- Example: `testimonial-1.jpg`

### Logo (`logo/`)
- Main logo: 300x100px (or vector)
- Format: PNG with transparency
- Files needed:
  - `logo.png` - Full color version
  - `logo-white.png` - White version for dark backgrounds
  - `favicon.ico` - Website favicon

### Videos (`videos/`)
- Format: MP4
- Resolution: 1080p
- Max duration: 60 seconds
- Max file size: 10MB

## Image Optimization Guidelines
1. Compress all images using tools like TinyPNG or ImageOptim
2. Use WebP format with JPG fallback for better performance
3. Maintain aspect ratios when resizing
4. Keep file sizes under:
   - Hero images: 300KB
   - Gallery images: 150KB
   - Testimonial photos: 50KB
   - Logo files: 100KB

## Required Assets Checklist
- [ ] Hero background image
- [ ] Minimum 6 before/after sets for gallery
- [ ] 3-4 testimonial profile photos
- [ ] Logo in both color and white versions
- [ ] Favicon
- [ ] 2-3 service demonstration videos 