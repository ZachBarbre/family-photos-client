import { writable } from 'svelte/store'

export const photos = writable([]);

export const error = writable(false)

export const moreImages = writable(true)

export const admin = writable(false);