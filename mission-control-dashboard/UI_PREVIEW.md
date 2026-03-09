# Mission Control Dashboard - UI Preview

## Visual Overview

This document describes what your Mission Control dashboard looks like.

---

## Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────┐  ┌─────────────────────────────────────────┐ │
│  │              │  │                                         │ │
│  │  Mission     │  │  Blockers for You                       │ │
│  │  Control     │  │  Items that need your attention or     │ │
│  │              │  │  approval                               │ │
│  │              │  │                                         │ │
│  │ ┌──────────┐ │  │ ┌─────────────────────────────────────┐ │ │
│  │ │ 🚧       │ │  │ │ Approve Dime Podcast Budget Q1      │ │ │
│  │ │ Blockers │ │  │ │                                     │ │ │
│  │ │ for You  │ │  │ │ Atlas needs approval for $5K        │ │ │
│  │ └──────────┘ │  │ │ marketing spend...                   │ │ │
│  │ ACTIVE       │  │ │                                     │ │ │
│  │              │  │ │ [Pending]           Impact: 85      │ │ │
│  │ ┌──────────┐ │  │ │                     Difficulty: 20  │ │ │
│  │ │ 🔄       │ │  │ └─────────────────────────────────────┘ │ │
│  │ │ Open     │ │  │                                         │ │
│  │ │ Loops    │ │  │ ┌─────────────────────────────────────┐ │ │
│  │ └──────────┘ │  │ │ Review Newton Insights Roadmap      │ │ │
│  │              │  │ │                                     │ │ │
│  │              │  │ │ Strategic decision needed on Q2...  │ │ │
│  │              │  │ │                                     │ │ │
│  │              │  │ │ [Pending]           Impact: 90      │ │ │
│  │              │  │ │                     Difficulty: 45  │ │ │
│  │              │  │ └─────────────────────────────────────┘ │ │
│  │              │  │                                         │ │
│  │              │  │ ┌─────────────────────────────────────┐ │ │
│  │ Built for    │  │ │ Sign Off on SCC Partnership Terms   │ │ │
│  │ Bryan Fields │  │ │                                     │ │ │
│  │              │  │ │ Final contract review needed...     │ │ │
│  └──────────────┘  │ │                                     │ │ │
│                    │ │ [Blocked]           Impact: 75      │ │ │
│                    │ │                     Difficulty: 30  │ │ │
│                    │ └─────────────────────────────────────┘ │ │
│                    │                                         │ │
│                    └─────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Layout Details

**Left Sidebar (256px wide):**
- Fixed position, always visible
- White background with subtle border
- "Mission Control" header at top
- Two navigation buttons (stacked vertically):
  - 🚧 Blockers for You (active = blue background)
  - 🔄 Open Loops (inactive = gray hover)
- "Built for Bryan Fields" footer at bottom

**Main Content Area:**
- Flexible width (fills remaining space)
- Light gray background (#F9FAFB)
- Max-width container (800px) for readability
- Content is centered with padding

---

## Mobile View (< 768px)

```
┌──────────────────────────┐
│ ☰                        │  ← Hamburger menu button
│                          │
│  Blockers for You        │  ← Section title
│  Items that need your... │
│                          │
│ ┌──────────────────────┐ │
│ │ Approve Dime Budget  │ │
│ │                      │ │
│ │ Atlas needs approval │ │
│ │ for $5K...           │ │
│ │                      │ │
│ │ [Pending]            │ │
│ │                      │ │
│ │ Impact: 85           │ │
│ │ Difficulty: 20       │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ Review Newton Road.. │ │
│ │                      │ │
│ │ Strategic decision.. │ │
│ │                      │ │
│ │ [Pending]            │ │
│ │                      │ │
│ │ Impact: 90           │ │
│ │ Difficulty: 45       │ │
│ └──────────────────────┘ │
│                          │
└──────────────────────────┘

When menu is tapped:
┌──────────────────────────┐
│ ✕   Mission Control      │  ← Close button
│                          │
│ ┌──────────────────────┐ │
│ │ 🚧 Blockers for You  │ │  ← Active
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ 🔄 Open Loops        │ │
│ └──────────────────────┘ │
│                          │
│                          │
│ Built for Bryan Fields   │
└──────────────────────────┘
```

**Mobile Features:**
- Navigation slides in from left
- Dark overlay behind menu
- Tap outside or X button to close
- Cards stack vertically (full width)
- Scores stack horizontally instead of vertically

---

## Color Scheme

### Background Colors
- **Page background:** Light gray (#F9FAFB)
- **Sidebar:** White (#FFFFFF)
- **Cards:** White with subtle shadow
- **Active nav button:** Blue (#2563EB)
- **Inactive nav button:** Transparent (hover: light gray)

### Status Badge Colors

| Status | Background | Text | Example |
|--------|------------|------|---------|
| Pending | Light Yellow (#FEF3C7) | Dark Yellow (#92400E) | [Pending] |
| Blocked | Light Red (#FEE2E2) | Dark Red (#991B1B) | [Blocked] |
| In Progress | Light Blue (#DBEAFE) | Dark Blue (#1E40AF) | [In Progress] |
| Waiting | Light Purple (#F3E8FF) | Dark Purple (#6B21A8) | [Waiting] |
| Done | Light Green (#D1FAE5) | Dark Green (#065F46) | [Done] |

### Score Colors (Impact & Difficulty)

| Range | Color | Weight | Example |
|-------|-------|--------|---------|
| 80-100 | Red (#DC2626) | Bold | **90** |
| 60-79 | Orange (#EA580C) | Semi-bold | **75** |
| 40-59 | Yellow (#CA8A04) | Medium | **55** |
| 1-39 | Green (#16A34A) | Normal | 25 |

---

## Component Details

### Card Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Title: Large, bold, dark gray                               │
│ (20px font, font-weight: 600)                               │
│                                                             │
│ Notes: Regular text, medium gray, smaller font              │
│ (14px font, line-height: relaxed for readability)           │
│                                                             │
│ [Status Badge]  ← Rounded pill, colored background          │
│                                                             │
│                                            Impact      90   │
│                                            (label)  (score) │
│                                                             │
│                                            Difficulty  45   │
│                                            (label)  (score) │
└─────────────────────────────────────────────────────────────┘
```

**Card Features:**
- White background
- Subtle border (#E5E7EB)
- Rounded corners (8px)
- Hover effect: shadow increases
- Smooth transition (200ms)

### Navigation Button

```
┌────────────────────────┐
│ 🚧 Blockers for You    │  ← Active state
└────────────────────────┘
Blue background (#2563EB)
White text
Rounded corners (8px)

┌────────────────────────┐
│ 🔄 Open Loops          │  ← Inactive state
└────────────────────────┘
Transparent background
Gray text (#374151)
Hover: Light gray background (#F3F4F6)
```

---

## Typography

| Element | Font Size | Weight | Color |
|---------|-----------|--------|-------|
| Sidebar header | 24px | Bold (700) | Dark gray (#111827) |
| Section title | 30px | Bold (700) | Dark gray (#111827) |
| Section subtitle | 16px | Normal (400) | Medium gray (#4B5563) |
| Card title | 20px | Semibold (600) | Dark gray (#111827) |
| Card notes | 14px | Normal (400) | Medium gray (#4B5563) |
| Score numbers | 30px | Bold (700) | Varies by value |
| Score labels | 12px | Medium (500) | Light gray (#6B7280) |
| Status badge | 12px | Medium (500) | Varies by status |
| Nav button | 16px | Medium (500) | White/Gray |

**Font family:** System fonts (Arial, Helvetica, sans-serif)

---

## Responsive Breakpoints

| Screen Size | Layout | Navigation |
|-------------|--------|------------|
| **< 768px** | Mobile | Hamburger menu + overlay |
| **768px - 1023px** | Tablet | Fixed sidebar (narrower) |
| **≥ 1024px** | Desktop | Fixed sidebar (full width) |

---

## Interactive Elements

### Hover States
- **Nav buttons:** Background lightens
- **Cards:** Shadow intensifies
- **Menu button (mobile):** Background lightens

### Loading State
```
┌──────────────────────────────┐
│                              │
│        ⟳                     │  ← Spinning circle
│     Loading...               │
│                              │
└──────────────────────────────┘
```

### Empty State
```
┌──────────────────────────────┐
│                              │
│     No items yet             │
│                              │
└──────────────────────────────┘
```

---

## Animation & Transitions

- **Card hover:** 200ms ease transition on shadow
- **Nav button:** 200ms ease on background color
- **Mobile menu:** 300ms ease slide-in/out
- **Loading spinner:** Continuous rotation animation
- **Page transitions:** Smooth, no flicker

---

## Accessibility

- **Contrast ratios:** WCAG AA compliant
- **Keyboard navigation:** Full support
- **Screen readers:** Semantic HTML, ARIA labels
- **Mobile touch targets:** 44px minimum
- **Focus states:** Visible outline on interactive elements

---

## Dark Mode Support

The dashboard respects system preferences:

**Light mode (default):**
- White backgrounds
- Dark text
- Subtle shadows

**Dark mode (if system prefers):**
- Dark backgrounds (#0A0A0A)
- Light text (#EDEDED)
- Adjusted contrast

*Note: Both modes maintain the same color-coded status and score system.*

---

## Real Data Example

When you visit the dashboard, you'll see something like:

**Blockers for You tab:**
- 3 items displayed as cards
- Each showing title, notes, status badge, impact & difficulty scores
- Sorted by priority (highest impact first, typically)

**Open Loops tab:**
- 4 items displayed as cards
- Similar layout to blockers
- Different set of data from JSON file

---

## Performance

- **First load:** < 2 seconds
- **Page transitions:** Instant (client-side)
- **Data updates:** Real-time (on page refresh)
- **Mobile performance:** Optimized, 60fps animations

---

## Browser Support

- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android)

---

## What Users See

1. **First visit:** Browser auth prompt (username/password)
2. **After auth:** Dashboard loads immediately
3. **Navigation:** Click sidebar tabs or hamburger menu (mobile)
4. **Content:** Scannable cards with clear hierarchy
5. **Actions:** No user actions needed - read-only dashboard

---

## Design Philosophy

**Clean & Fast:**
- Minimal decoration
- Clear hierarchy
- Fast loading
- No unnecessary animations

**Scannable:**
- Large numbers for impact/difficulty
- Color-coded for quick assessment
- Status badges for at-a-glance understanding

**Professional:**
- Consistent spacing
- Professional color scheme
- Subtle shadows and borders
- Clean typography

**Mobile-First:**
- Works great on phone
- Touch-friendly
- Responsive layout
- Menu accessible

---

Built for quick decision-making and status awareness.

Bryan gets a clear view of what needs attention and what's in motion.

Atlas gets a simple system to keep Bryan informed.

**Result:** Less context-switching, more clarity, faster decisions.

🚀 Ready to ship!
