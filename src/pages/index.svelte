<script>
    import { ready } from '@roxi/routify'
    import { getApi } from '../utils/crud'
    import FeedPhoto from './_componets/FeedPhoto.svelte'
    import Loader from './_componets/Loader.svelte'
    import { photos } from './_stores'
    
    let loading = true

    async function getPhotos() {
        const data = await getApi('API_URL/photos')
        photos.update(photoArray => photoArray.concat(data.data))
        loading = false;
        $ready()
    }

    if ($photos.length === 0) {
        getPhotos()
    } else {
        loading = false
    }

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
        {#each $photos as photo }
            <FeedPhoto photoData={photo} />
        {/each}
    {/if}
 </main>

