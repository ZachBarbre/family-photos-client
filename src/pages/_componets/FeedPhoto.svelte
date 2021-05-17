<script>
  import { url, prefetch } from "@roxi/routify";
  import Heart from './Heart.svelte';
  export let photoData;
  const options = {
        validFor: 3600,
        writeHeaders: true
    };
</script>

<style>
  .photo {
    display: grid;
    justify-items: center;
    border: 1px solid var(--greyblue);
    max-width: 620px;
    
  }
  
  img {
    width: 100%;
    border-bottom: 1px solid var(--greyblue);
  }

</style>

<div class="photo">
  <a use:prefetch={options} href="{$url(`/photo/:photoId`,  { photoId: photoData.id })}">
      <img 
        sizes="(max-width: 375px) 95vw, 640px"
        srcset="
        {photoData.spaces.image_350.url} 350w,
        {photoData.spaces.image_620.url} 640w"
        src="{photoData.spaces.image_620.url}" 
        alt="{photoData.description}">
  </a>
  <Heart />
</div>

