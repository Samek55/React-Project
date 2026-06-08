// Dynamically require so a try-catch can catch the "native module not found"
// error that occurs in Expo Go or any binary that wasn't built with OneSignal.
let _OneSignal: any;

try {
  _OneSignal = require("react-native-onesignal").OneSignal;
} catch {
  _OneSignal = {
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
}

export const OneSignal = _OneSignal;
export type NotificationWillDisplayEvent = any;

/** Tag the current device/user for OneSignal audience targeting. */
export function setUserTag(key: string, value: string): void {
  try {
    _OneSignal.User.addTag(key, value);
  } catch {}
}

/** Set multiple OneSignal tags at once. */
export function setUserTags(tags: Record<string, string>): void {
  try {
    _OneSignal.User.addTags(tags);
  } catch {}
}

/** Remove an OneSignal tag from the current device/user. */
export function removeUserTag(key: string): void {
  try {
    _OneSignal.User.removeTag(key);
  } catch {}
}
