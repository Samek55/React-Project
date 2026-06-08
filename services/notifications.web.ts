export const OneSignal = {
  initialize: (_id: string) => {},
  Notifications: {
    clearAll: () => {},
    requestPermission: (_fallback: boolean) => {},
    addEventListener: (_event: string, _listener: any) => {},
    removeEventListener: (_event: string, _listener: any) => {},
  },
  User: {
    addTag: (_key: string, _value: string) => {},
    addTags: (_tags: Record<string, string>) => {},
    removeTag: (_key: string) => {},
  },
};
export type NotificationWillDisplayEvent = any;

/** Tag the current device/user for OneSignal audience targeting. */
export function setUserTag(_key: string, _value: string): void {}

/** Set multiple OneSignal tags at once. */
export function setUserTags(_tags: Record<string, string>): void {}

/** Remove an OneSignal tag from the current device/user. */
export function removeUserTag(_key: string): void {}
