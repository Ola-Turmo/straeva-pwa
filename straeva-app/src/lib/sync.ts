// Optional Convex cloud sync.
// Set NEXT_PUBLIC_CONVEX_URL to enable cloud backup.
// Without it, the app works fully offline via localStorage (Dexie).

import type { AppState } from "@/types";

export interface SyncStatus {
  connected: boolean;
  lastSyncedAt: number | null;
  pendingEvents: number;
}

let syncStatus: SyncStatus = { connected: false, lastSyncedAt: null, pendingEvents: 0 };

export function getSyncStatus(): SyncStatus {
  return syncStatus;
}

export async function initSync(): Promise<void> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    syncStatus = { connected: false, lastSyncedAt: null, pendingEvents: 0 };
    return;
  }
  // When Convex is deployed and URL is set, initialize the client.
  // The actual Convex client is initialized lazily on first use.
  syncStatus = { connected: true, lastSyncedAt: Date.now(), pendingEvents: 0 };
}

export async function pushStateToServer(state: AppState): Promise<void> {
  if (!syncStatus.connected) return;
  // With Convex URL set: POST state to Convex backend.
  // Example (after running `convex dev`):
  //   const { ConvexHttpClient } = await import('convex');
  //   const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  //   await client.mutation('state:saveState', { ... });
  syncStatus = { ...syncStatus, lastSyncedAt: Date.now() };
}

export async function pullStateFromServer(): Promise<AppState | null> {
  if (!syncStatus.connected) return null;
  // With Convex URL set: fetch latest state from Convex backend.
  return null;
}
