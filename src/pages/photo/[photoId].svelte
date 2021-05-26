<script>
  import { ready } from '@roxi/routify'
  import { getApi } from '../../utils/crud'
  import Heart from '../_componets/Heart.svelte';
  import Loader from '../_componets/Loader.svelte'
  import { photos } from '../_stores';
  export let photoId
  let loading = true;
  let photo = isPhotoInStore(photoId)
  
  function isPhotoInStore(id) {
    const storePhoto = $photos.filter(photo => photo.id === id)
    if (storePhoto.length) {
      return storePhoto[0]
    }
    return null;
  }

  async function getPhoto(id) {
    const data = await getApi(`API_URL/photos/photo/${id}`)
    photo = data.data[0]
    loading = false
    $ready()
  }

  if (!photo) {
    getPhoto(photoId)
  } else {
    loading = false
  }

</script>

<style>
  .large-photo {
    display: grid;
    justify-items: center;
    max-width: 1580px;
    width: 50%;
    margin: 0 auto;
  }
  
  @media screen and (max-width: 1000px) {
    .large-photo {
      width: 80%;
    }
  }
  @media screen and (max-width: 420px) {
    .large-photo {
      width: 95%;
    }
  }
  .photo {
    display: grid;
    justify-items: center;
    border: 1px solid var(--greyblue);
    
  }

  .photo p {
    padding: 0 1rem;
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
        srcset="{photo.spaces.image_350.cdnUrl} 350w,
        {photo.spaces.image_620.cdnUrl} 620w,
        {photo.spaces.image_748.cdnUrl} 748w,
        {photo.spaces.image_1004.cdnUrl} 1004w,
        {photo.spaces.image_1580.cdnUrl} 1500w" 
        src="{photo.spaces.image_620.cdnUrl}" 
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

