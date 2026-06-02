import type { CSSProperties } from 'react';

/** CSS custom properties for school white-label (scoped under portal shells). */
export type SchoolBrandCssVariables = CSSProperties & {
  '--color-primary': string;
  '--color-primary-dark': string;
  '--color-primary-light': string;
};

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().replace('#', '');
  if (!/^[\da-f]{6}$/i.test(normalized)) {
    return null;
  }
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function toHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.round(Math.max(0, Math.min(255, n)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map(n => n.toString(16).padStart(2, '0'))
    .join('')}`;
}

function darken(hex: string, amount: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  const factor = 1 - amount;
  return toHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

function mixWithWhite(hex: string, whiteWeight: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  const w = Math.max(0, Math.min(1, whiteWeight));
  return toHex(rgb.r + (255 - rgb.r) * w, rgb.g + (255 - rgb.g) * w, rgb.b + (255 - rgb.b) * w);
}

/** Map a school primary hex to token overrides used by Tailwind `var(--color-primary*)` utilities. */
export function schoolBrandCssVariables(primaryColor: string): SchoolBrandCssVariables {
  return {
    '--color-primary': primaryColor,
    '--color-primary-dark': darken(primaryColor, 0.18),
    '--color-primary-light': mixWithWhite(primaryColor, 0.88),
  };
}
