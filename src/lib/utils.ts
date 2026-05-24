export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || 'S';
}
