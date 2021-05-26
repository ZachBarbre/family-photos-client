<script>
    import { ready } from '@roxi/routify'
    import { getApi } from '../utils/crud'
    import FeedPhoto from './_componets/FeedPhoto.svelte'
    import Loader from './_componets/Loader.svelte'
    import { photos, moreImages } from './_stores'
    
    let loading = true
    let loadingMore = false;
    let lastImageId = null
    let scrollCheck = null;

    async function getPhotos() {
        const data = await getApi('API_URL/photos')
        photos.update(photoArray => photoArray.concat(data.data))
        loading = false;
        lastImageId = data.data[9].id
        $ready()
    }

    async function loadMorePhotos() {
        const limit = 5;
        const data = await getApi(`API_URL/photos/?id=${lastImageId}&limit=${limit}`)
        photos.update(photoArray => photoArray.concat(data.data))
        const numberOfPhotos = data.data.length
        lastImageId = data.data[numberOfPhotos - 1].id
        if (numberOfPhotos < limit) {
            moreImages.set(false);
        }
    }

    function handleScrollCheck() {
        if (!scrollCheck && !loadingMore) {
            let offset = (document.height !== undefined) 
                ? document.height 
                : document.body.offsetHeight
            let scrollY = window.scrollY
            scrollCheck = offset - scrollY
            if (scrollCheck < 2500 && $moreImages) {
                loadingMore = true
                loadMorePhotos()
            }
            setTimeout(() => {
                scrollCheck = null;
            }, 100)
        }
    }

    if ($photos.length === 0) {
        getPhotos()
    } else {
        loading = false
    }

</script>

<svelte:window on:scroll={handleScrollCheck} />

<style>
	main {
		display: grid;
		justify-content: center;
		/* padding: 1em; */
		/* margin: 0 auto; */
        gap: 10px;
	}

    .hide {
        display: none;
    }

    button {
        color: var(--darkblue);
        border: 1px solid var(--darkblue);
        border-radius: 5px;
        background-color: var(--lightgreen);
        padding: .5rem;
        font-size: medium;
    }
</style>

 <main>
    {#if loading}
        <Loader />
    {:else}
        {#each $photos as photo}
            <FeedPhoto photoData={photo} />
        {/each}
        <button class:hide={!$moreImages} on:click={loadMorePhotos}>Load More</button>
    {/if}
 </main>
