import { create } from "zustand";
import { LedgerEntry } from "@/types";
import { mockLedger, mockUser } from "@/services/mockData";

interface CreditsState {
  balance: number;
  ledger: LedgerEntry[];
  spend: (amount: number, label: string) => void;
  recharge: (amount: number, label: string) => void;
}

export const useCreditsStore = create<CreditsState>((set, get) => ({
  balance: mockUser.creditsBalance,
  ledger: mockLedger,
  spend: (amount, label) =>
    set((state) => ({
      balance: state.balance - amount,
      ledger: [
        { id: `l_${Date.now()}`, amount: -amount, reason: "generation", label, createdAt: new Date().toISOString() },
        ...state.ledger,
      ],
    })),
  recharge: (amount, label) =>
    set((state) => ({
      balance: state.balance + amount,
      ledger: [
        { id: `l_${Date.now()}`, amount, reason: "recharge", label, createdAt: new Date().toISOString() },
        ...state.ledger,
      ],
    })),
}));
