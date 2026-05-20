/** Outline-style icons aligned with Ionicons used in React-Project drawer (size 20). */

export function DrawerIconHome({ color }: { color: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-8H10v8H5a1 1 0 0 1-1-1v-9.5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DrawerIconKey({ color }: { color: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15.5 7.5a2.5 2.5 0 1 1-3.16 2.41L7 15v3h3v-2l2.09-2.09A2.5 2.5 0 1 1 15.5 7.5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DrawerIconCallOutline({ color }: { color: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke={color}
        strokeWidth={1.65}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DrawerIconInformationCircle({ color }: { color: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.5} />
      <path
        d="M12 16v-5"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="0.9" fill={color} />
    </svg>
  );
}

export function DrawerIconCarSport({ color }: { color: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 14h16l-1.2-4.5a1 1 0 0 0-.97-.75H6.17a1 1 0 0 0-.97.75L4 14Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M6 14v2M18 14v2M4 18h16M8 18v1.5M16 18v1.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M9 10h6"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DrawerIconBusiness({ color }: { color: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20V10l8-4 8 4v10M9 20v-6h6v6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DrawerIconHelpCircle({ color }: { color: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.5} />
      <path
        d="M9.5 9a2.5 2.5 0 0 1 4.2-1.7c.6.55.95 1.35.8 2.2-.2 1.1-1.5 1.5-2 2.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="0.9" fill={color} />
    </svg>
  );
}

export function DrawerIconBook({ color }: { color: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4.5A1.5 1.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 19.5v-15Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M9 3v18M13 7h4M13 11h4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DrawerIconClose({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="#334155"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
