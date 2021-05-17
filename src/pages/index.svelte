<script>
    import { ready } from '@roxi/routify'
    import FeedPhoto from './_componets/FeedPhoto.svelte'
    import Loader from './_componets/Loader.svelte'
    import photoData from '../store/stores'
    
    let loading = true
    let photos = []

    async function getPhotos() {
        const response = await fetch('API_URL/photos', { 'x-routify-valid-for': 3600})
        const data = await response.json()
        photos = data.data;
        loading = false;
        $ready()
    }
    getPhotos()
</script>

<style>
	main {
		display: grid;
		justify-content: center;
		/* padding: 1em; */
		/* margin: 0 auto; */
        gap: 10px;
	}
    	
</style>

 <main>
    {#if loading}
        <Loader />
    {:else}
        {#each photos as photo (photo.id)}
            <FeedPhoto photoData={photo} />
        {/each}
    {/if}
 </main>

