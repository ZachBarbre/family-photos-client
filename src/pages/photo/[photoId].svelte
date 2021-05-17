<script>
  import { ready } from '@roxi/routify'
  import Heart from '../_componets/Heart.svelte';
  import Loader from '../_componets/Loader.svelte'
  export let photoId
  let photo = {}
  let loading = true;

  async function getPhoto(id) {
    const response = await fetch(`API_URL/photos/photo/${id}`)
    const data = await response.json()
    photo = data.data[0]
    loading = false
    $ready()
  }

  getPhoto(photoId)
</script>

<style>
  .large-photo {
    display: grid;
    justify-items: center;
    max-width: 1580px;
    width: 50%;
    margin: 0 auto;
  }
  @media screen and (max-width: 420px) {
    .large-photo {
      width: unset;
    }
  }

  @media screen and (max-width: 1000px) {
    .large-photo {
      width: 80%;
    }
  }
  .photo {
    display: grid;
    justify-items: center;
    border: 1px solid var(--greyblue);
    
  }
  
  img {
    width: 100%;
    border-bottom: 1px solid var(--greyblue);
    
  }

  .comments {
    justify-self: start;
  }

  h2 {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 100;
  }
</style>

<main class="large-photo">
  {#if loading}
    <Loader />
  {:else}
    <div class="photo">
      <img
        sizes="(max-width: 1004px) 95vw, 1580px"
        srcset="{photo.spaces.image_350.url} 350w,
        {photo.spaces.image_620.url} 620w,
        {photo.spaces.image_748.url} 748w,
        {photo.spaces.image_1004.url} 1004w,
        {photo.spaces.image_1580.url} 1500w" 
        src="{photo.spaces.image_620.url}" 
        alt="{photo.description}" >
      <p>{photo.description}</p>
      <Heart />
    </div>
  {/if}
  <div class="comments">
    <h2>Comments:</h2>
    <p>Coming Soon!</p>
  </div>
</main>

