import { create } from 'zustand';

export interface BookingItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Booking {
  id: string;
  branchId: string;
  branchName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  time: string;
  guests: number;
  items: BookingItem[];
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface BookingState {
  bookings: Booking[];
  unreadCount: number;
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
  markAsRead: (bookingId: string) => void;
  getBookingsByBranch: (branchId: string) => Booking[];
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  unreadCount: 0,

  addBooking: (bookingData) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      bookings: [newBooking, ...state.bookings],
      unreadCount: state.unreadCount + 1,
    }));

    // Persist to localStorage
    const allBookings = [...get().bookings];
    localStorage.setItem('mock_bookings', JSON.stringify(allBookings));
  },

  markAsRead: (bookingId) => {
    set((state) => ({
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  getBookingsByBranch: (branchId) => {
    return get().bookings.filter((b) => b.branchId === branchId);
  },
}));
