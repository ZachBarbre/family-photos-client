<script>
    import FeedPhoto from './_componets/FeedPhoto.svelte'
    import { metatags } from '@roxi/routify'
    import { photos } from './_data';
    metatags.title = 'Barbre.Family'
    metatags.description = 'Description coming soon...'
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
    {#each photos as photo}
        <FeedPhoto photoData={photo}/>
    {/each}
 </main>

