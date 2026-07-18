import { create } from "zustand";
import { AppNotification } from "@/types";
import { mockNotifications } from "@/services/mockData";

interface NotificationsState {
  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  markRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      return { notifications, unreadCount: notifications.filter((n) => !n.read).length };
    }),
}));
