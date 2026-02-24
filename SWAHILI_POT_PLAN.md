# Swahili Pot Booking System - Implementation Plan

## 1. Project Overview
**Swahili Pot** is an event venue booking platform based in Mombasa, Kenya, offering a smart, culturally resonant booking experience for venues like "Pwani Boardroom", "Bahari Lounge", "Mkenya Grand Hall", and "Bustani Garden".

### Purpose
To provide an elegant, user-friendly platform for customers to browse venues, check availability, and make bookings, while giving administrators powerful tools to manage venues and reservations.

---

## 2. Technical Architecture

### Frontend (User Interface)
- **Framework**: React + Vite
- **Styling**: Tailwind CSS (with custom configuration for Swahili Pot branding)
- **State Management**: React Context / Hooks
- **Routing**: React Router DOM
- **HTTP Client**: Axios/Fetch

### Backend (API & Data)
- **Server**: Node.js with Express
- **Database**: MySQL (using `mysql2`)
- **Authentication**: JWT (JSON Web Tokens) with `bcryptjs`
- **Security**: CORS, Environment Variables

---

## 3. Design System & Branding

### Color Palette
- **Primary**: `#E74C3C` (Coral/Orange Red) - Main Actions, Buttons
- **Secondary**: `#F5E6D3` (Warm Beige) - Backgrounds
- **Accent**: `#4A4A4A` (Dark Gray/Charcoal) - Text, Footer
- **Neutral**: `#FFFFFF` (White) - Cards, Content Areas

### Typography
- **Headings**: Elegant Serif (e.g., Playfair Display or similar)
- **Body**: Clean Sans-serif (e.g., Inter, Lato)

### Cultural Elements
- Use phrases like "Karibu" (Welcome) and "Hakuna Wasiwasi" (No Worries).
- Default currency: KES (Kenyan Shillings).

---

## 4. Implementation Phases

### Phase 1: MVP (Minimum Viable Product)
**Goal**: Functional venue listing and basic booking capability.

#### 1.1 Foundation & Configuration
- [ ] Configure Tailwind CSS with Swahili Pot colors and fonts.
- [ ] Create folder structure for `components`, `pages`, `context`, `services`.
- [ ] Setup `react-router-dom` for navigation (Home, Venues, Booking, Admin).

#### 1.2 Database Schema (MySQL)
- [ ] **Venues Table**: `id`, `name`, `type`, `capacity_min`, `capacity_max`, `price`, `description`, `features`, `status`, `image_url`.
- [ ] **Bookings Table**: `id`, `venue_id`, `customer_name`, `customer_email`, `customer_phone`, `event_date`, `event_type`, `guest_count`, `status`, `total_amount`.
- [ ] **Users Table**: `id`, `username`, `password_hash`, `role` (admin/staff).

#### 1.3 Core UI Components
- [ ] **Navbar**: Responsive, with "Book Now" CTA.
- [ ] **Footer**: Contact info, social links, copyright.
- [ ] **VenueCard**: Display venue image, name, capacity, price.
- [ ] **HeroSection**: "Karibu Swahili Pot" with search/CTA.

#### 1.4 Pages
- [ ] **Home**: Hero section, featured venues, "Why Choose Us".
- [ ] **Our Venues**: Grid list of all venues with filters (capacity, price).
- [ ] **Venue Details**: Single venue page with gallery, features, availability calendar.
- [ ] **Booking Form**: Multi-step form (Select Date -> Details -> Confirm).
- [ ] **Admin Dashboard**:
    - **Dashboard Overview**: Key metrics.
    - **Venue Management**: Add/Edit/Disable venues.
    - **Booking Management**: View/Approve/Reject bookings.

#### 1.5 Backend API Development
- [ ] GET `/api/venues` - List all venues.
- [ ] GET `/api/venues/:id` - Get venue details.
- [ ] POST `/api/bookings` - Create a new booking.
- [ ] GET `/api/bookings` - List bookings (Admin).
- [ ] PUT `/api/bookings/:id` - Update status (Approve/Reject).

### Phase 2: Enhancements
**Goal**: Improved UX and "Smart" features.

- [ ] **AI Assistant**: simple chatbot interface or "Wizard" for venue recommendation based on event type/guests.
- [ ] **Advanced Filters**: Filter by amenities (Projector, Sound System).
- [ ] **Email Notifications**: Confirmation emails via SMTP/Service (SendGrid/Nodemailer).

### Phase 3: Advanced
**Goal**: Mobile optimization and Analytics.

- [ ] **Mobile Optimization**: improved touch controls.
- [ ] **Analytics Dashboard**: Revenue charts, popular venues.
- [ ] **Staff Portal**: Simplified view for daily operations.

---

## 5. Development Standards
- **Component Documentation**: All components will include detailed JSDoc comments explaining props and usage.
- **Code Comments**: Logic blocks will be heavily commented to explain "why" and "how".
- **Git Workflow**: Feature branches -> Pull Request -> User Review -> Merge.

---

## 6. Immediate Next Steps
1.  Approve this plan.
2.  Install necessary frontend dependencies (e.g., icons, router).
3.  Configure `tailwind.config.js`.
4.  Create the basic layout (Header/Footer).
