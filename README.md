# Barbre.Family

This is a website for sharing my family photos.

You can view the api at (https://github.com/ZachBarbre/family-photos-api)

It was built using the starter template for [Routify](https://github.com/sveltech/routify).

### Tech's used

[Svelte](https://svelte.dev) because single file componets are my favorite thing and svelte is a really nice language to work in.

[Routify](https://routify.dev/) because folder based routing makes life so much easier. I chose Routify over sveltekit because at the time sveltekit wasn't fully baked. I may revist this in the future.

it is currenlty hosted on a [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets/) along with the API.

### Intersting bit of code

The [index](https://github.com/ZachBarbre/family-photos-client/blob/main/src/pages/index.svelte) page incorporates infinte scrolling using a fucntion to check where the user is on the page and if anymore photos are avalibe to load.

### What's next

Add in a comment and 'liking' system with user auth.

### npm scripts

For local development run `npm run dev` after cloning this repo, cloning the api repo and starting up the local api server.

For production run `npm run build:app` to build this as single page app. The deployment of this uses `npm run serve` with [PM2](https://pm2.keymetrics.io/) to serve the spa.
