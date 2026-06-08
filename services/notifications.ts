// Metro resolves .native.ts / .web.ts at runtime; this file satisfies TypeScript.
export { OneSignal, NotificationWillDisplayEvent } from "react-native-onesignal";

// Tag helpers — implemented in .native.ts / .web.ts
export declare function setUserTag(key: string, value: string): void;
export declare function setUserTags(tags: Record<string, string>): void;
export declare function removeUserTag(key: string): void;
