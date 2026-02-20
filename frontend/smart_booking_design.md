# Smart Booking Dashboard Design

## Overview
This document outlines the design and structure for the "Smart Booking" dashboard interface based on the provided reference image. The interface functions as an administrative view for managing bookings, specifically showing invoice/booking details.

## Layout Structure

### 1. Sidebar Navigation (Left Panel)
*   **Header**: "Smart Booking" Logo/Brand.
*   **Menu Items**:
    *   Dashboard (Active state: Blue background with white text).
    *   Staff Members
    *   Customer
    *   Services
    *   Calendar
    *   Payments
    *   Settings
*   **Footer**: "Logout" option or similar (implied).

### 2. Main Content Area (Right Panel)
*   **Top Bar**:
    *   Breadcrumbs/Title: "Dashboard / Appointment / View".
    *   User Profile: Admin user avatar/name on the right.
    *   Language Selector: "English" dropdown.

*   **Content Card (Invoice/Booking Details)**:
    *   **Header**:
        *   "Smart Booking" Logo.
        *   "Invoice #": Unique identifier.
    *   **Customer Details ("TO:")**:
        *   Name: Nicole Lance.
        *   Phone: +1 (800) 246-4229.
        *   Email: nicole@mediacolor.com.
    *   **Booking Table**:
        *   Columns: Item (Service Name), Date, Time, Duration, Price.
        *   Row Example: "Hair Cut", "Jan 2, 2024", "10:00 AM", "30 Mins", "$25.00".
    *   **Totals Section**:
        *   Subtotal, Tax, Total Amount.
    *   **Payment Information**:
        *   Payment Date: Dec 2, 2023.
        *   Payment Status: Paid (Green badge).
    *   **Action Buttons**:
        *   "Print" button.
        *   "Download" button.

## Visual Style
*   **Color Palette**:
    *   **Primary**: Blue (`#3B82F6` or similar) for active states and primary buttons.
    *   **Background**: Light Gray (`#F3F4F6`) for the main app background.
    *   **Card Background**: White (`#FFFFFF`) with subtle shadow.
    *   **Text**: Dark Gray (`#1F2937`) for headings, Medium Gray (`#6B7280`) for secondary text.
*   **Typography**: Sans-serif font (Inter or system default).
*   **Spacing**: Generous padding within the card (p-8 or p-10).

## Component Architecture (React)

```jsx
// Main Layout Component
<DashboardLayout>
  <Sidebar />
  <MainContent>
    <TopBar />
    <BookingInvoiceCard />
  </MainContent>
</DashboardLayout>
```
