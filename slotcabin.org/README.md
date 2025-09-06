# SlotCabin.org - Social Gaming Platform

A mobile-first, desktop responsive social gaming platform that emphasizes user registration and virtual coins. No real money gambling or payouts — all coins are virtual and for entertainment only.

## Features

- **Virtual Currency System**: All coins are virtual with no real-world value
- **User Registration**: Get 5,000 free coins on signup
- **10+ Games**: From providers like Hacksaw Gaming, Pragmatic Play, Nolimit City, Evolution Gaming, and Peter & Sons
- **Leaderboards**: Compete with other players
- **Age Verification**: 18+ only platform
- **Cookie Consent**: GDPR compliant cookie management
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Theme**: Modern neon-accented dark UI

## Setup Instructions

1. **Extract Files**: Unzip the slotcabin.org.zip file to your web server directory

2. **Web Server**: Serve the files through a web server (Apache, Nginx, or local development server)
   ```bash
   # For local development with Python
   cd slotcabin.org
   python -m http.server 8000
   
   # For local development with Node.js
   npx serve .
   ```

3. **Access**: Open your browser and navigate to:
   - Local: http://localhost:8000
   - Production: https://your-domain.com

## File Structure

```
slotcabin.org/
├── index.html              # Landing page
├── games/
│   └── index.html          # Games hub
├── login/
│   └── index.html          # Login/Register
├── profile/
│   └── index.html          # User dashboard
├── privacy/
│   └── index.html          # Privacy Policy (500+ words)
├── terms/
│   └── index.html          # Terms of Service (800+ words)
├── cookies/
│   └── index.html          # Cookies Policy (300+ words)
├── contact/
│   └── index.html          # Contact page
├── responsible-gaming/
│   └── index.html          # Responsible gaming info
├── css/
│   ├── styles.css          # Main styles
│   ├── games.css           # Games page styles
│   ├── auth.css            # Authentication styles
│   ├── legal.css           # Legal pages styles
│   ├── contact.css         # Contact page styles
│   └── profile.css         # Profile page styles
├── js/
│   ├── main.js             # Core functionality
│   ├── games.js            # Games functionality
│   ├── auth.js             # Authentication
│   ├── contact.js          # Contact form
│   ├── profile.js          # Profile management
│   └── responsible-gaming.js # Support info
├── data/
│   ├── games.json          # Games list
│   ├── leaderboard.json    # Top players
│   └── users.json          # Sample users
└── assets/
    ├── logo.svg            # Site logo
    └── favicon.ico         # Site icon
```

## Key Functionality

### Registration & Login
- Users must register before accessing games
- 5,000 virtual coins awarded on registration
- Data stored in localStorage
- Form validation and error handling

### Games System
- 12+ games from major providers
- iframe placeholders for easy game integration
- Modal-based game display
- Login required to play games

### Virtual Economy
- Virtual coins with no real-world value
- "Buy Coins" simulation (no actual payment)
- Daily bonus system
- Coin balance tracking

### Age & Cookie Compliance
- Age verification popup (18+ required)
- Cookie consent banner
- 30-day localStorage expiry for age verification
- GDPR-compliant cookie management

### Responsive Design
- Mobile-first approach
- Dark theme with neon accents
- Smooth animations and transitions
- Touch-friendly interface

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security Features

- Client-side data validation
- XSS protection through proper escaping
- No external dependencies for security
- Local asset hosting only

## SEO Optimization

Each page includes:
- Proper meta titles (30-70 characters)
- Meta descriptions (90-200 characters)
- Relevant keywords (8-10 per page)
- Canonical URLs
- Semantic HTML structure

## Legal Compliance

- Privacy Policy: 500+ words
- Terms of Service: 800+ words  
- Cookies Policy: 300+ words
- Responsible Gaming information
- GamCare and GambleAware resources

## Testing Checklist

✅ Mobile responsive design
✅ Registration and login functionality  
✅ Age verification popup with localStorage
✅ Cookie consent with localStorage
✅ Games loading and modal display
✅ Leaderboard data loading
✅ Virtual coin system working
✅ All navigation links functional
✅ SEO meta tags present on all pages
✅ Legal pages meet word count requirements
✅ Contact form validation
✅ Profile dashboard functionality

## Support

For technical support or questions:
- Email: info@slotcabin.org
- Phone: +1 (555) 123-4567

## License

This project is for entertainment purposes only. No real money gambling or payouts are involved.

---

**Important**: This platform uses virtual coins only and does not involve real money gambling. All games are for entertainment purposes only.