import { writable } from 'svelte/store'

export const photos = writable([]);

export const error = writable(false)

export const morePhotos = writable(true)