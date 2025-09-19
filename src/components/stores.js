import { writable } from 'svelte/store'

export const mobile = writable(0)
export const active = writable(0)

export const displaySiteBanner = writable(false) // Show the site Banner.svelte component

// Theme management
export const isDarkMode = writable(true) // Default to dark mode

// Theme toggle function
export function toggleTheme() {
  isDarkMode.update(current => !current)
}
