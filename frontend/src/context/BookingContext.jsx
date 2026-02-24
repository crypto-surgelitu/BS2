import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

// ── Helpers: load/save from localStorage ──────────────────
const STORAGE_KEY = "swahilipot_bookings";

const loadBookings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveBookings = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    console.error("Could not save bookings");
  }
};

export const BookingProvider = ({ children }) => {
  // ✅ Load from localStorage on first render — survives page refresh
  const [bookings, setBookings] = useState(loadBookings);

  // ── Add a new booking ──────────────────────────────────────
  const addBooking = (bookingData) => {
    // Check for duplicate slot (same space + date + time)
    const duplicate = bookings.find(
      (b) =>
        b.space === bookingData.space &&
        b.date  === bookingData.date  &&
        b.time  === bookingData.time
    );
    if (duplicate) {
      return { success: false, message: "That slot is already booked. Please choose a different time." };
    }

    const newBooking = {
      ...bookingData,
      id:      `SP-${String(bookings.length + 1).padStart(3, "0")}`,
      status:  "confirmed",
      created: new Date().toISOString(),
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    saveBookings(updated); // ✅ persist immediately
    return { success: true };
  };

  // ── Update booking status (admin) ──────────────────────────
  const updateBookingStatus = (id, newStatus) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    setBookings(updated);
    saveBookings(updated); // ✅ persist
  };

  // ── Delete a booking (admin) ───────────────────────────────
  const deleteBooking = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    saveBookings(updated); // ✅ persist
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
export default BookingProvider;
