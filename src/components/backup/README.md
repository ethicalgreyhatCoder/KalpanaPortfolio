# Components Backup Folder

This folder contains unused JSX and CSS files that were moved from the main components directory.

## Date Moved
December 15, 2025

## Files in This Folder

### Unused Component Files
These components are not currently imported or used in the application:

**JSX Files:**
- `About-New.jsx` - Alternative About component (not used)
- `BrushStroke.backup.jsx` - Backup of BrushStroke component
- `BrushStroke.jsx` - BrushStroke component (not used)
- `Gallery-Refactored.jsx` - Refactored Gallery version (not used)
- `Gallery.backup.jsx` - Backup of Gallery component
- `GalleryNew.jsx` - New Gallery version (not used)
- `RevealOnScroll.jsx` - Scroll animation component (not used)
- `BookingIntentSheet.jsx` - Modal booking component (replaced with direct scroll)
- `BookingIntentSheet.css` - Styles for BookingIntentSheet

**CSS Files:**
- `About-Cards-Timeline-Enhanced.css` - Enhanced About styles (not used)
- `About-Enhanced.css` - Alternative About styles (not used)
- `BrushStroke.css` - BrushStroke component styles
- `Gallery-Enhanced.css` - Enhanced Gallery styles (not used)
- `Gallery-Instagram.css` - Instagram-style Gallery styles (not used)
- `Gallery-Refactored.css` - Refactored Gallery styles (not used)
- `NetflixModal.backup.css` - Backup of Netflix-style modal
- `NetflixModal.css` - Netflix-style modal styles (not used)
- `Portfolio.css` - Portfolio styles (not used)

## Currently Active Components

The following components are actively used in the application (located in parent `components/` folder):

**Active Components:**
- `About.jsx` / `About.css`
- `AudioController.jsx` / `AudioController.css`
- `CherryBlossoms.jsx`
- `Contact.jsx` / `Contact.css`
- `Gallery.jsx`
- `Hero.jsx` / `Hero.css`
- `Navbar.jsx` / `Navbar.css`
- `Services.jsx` / `Services.css`
- `Skills.jsx` / `Skills.css`
- `SkillModal.jsx` / `SkillModal.css`

## Purpose of This Folder

These files were moved to:
1. **Clean up the components directory** - Easier to navigate and find active components
2. **Preserve code history** - Keep unused components for future reference
3. **Maintain organization** - Separate active from inactive code

## Restoring Files

If you need to restore any of these files:

1. Copy the file from `backup/` to the parent `components/` directory
2. Import it in your component or page where needed
3. Ensure any associated CSS is also restored if needed

## Safe to Delete?

**No** - Keep these files as backup for:
- Code reference
- Reverting changes if needed
- Reusing components or styles in future

If you're certain you'll never need them, you can delete this folder, but it's recommended to keep it for at least a few months.

---

**Note:** This is a backup folder created during project refactoring. All files here are non-functional copies of components that are no longer used in the active application.

