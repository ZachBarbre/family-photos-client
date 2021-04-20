<script>
  export let photoData;
  let count = photoData.likes;
  let liked = false;

  function like() {
    if (!liked) {
      count += 1;
    }
    liked = true;
  }
</script>

<style>
  .photo {
    display: grid;
    justify-items: center;
    border: 1px solid var(--greyblue);
    max-width: 500px;
    
  }
  
  img {
    width: 100%;
    border-bottom: 1px solid var(--greyblue);
    
  }

  .like {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 .25rem 0;
    min-height: 21px;
    border: none;
    background: none;
  }

  .like:hover {
    border: 1px solid var(--coral);
    border-radius: 5px;
  }

  .like > * {
    margin: 0 3px;
  }

  .bi-heart-fill {
    color: var(--pink);
    padding-top: 2px;
  }

  .no-hearts {
    color: var(--pink);
    font-size: x-small;
    margin-bottom: 3px;
  }

</style>

<div class="photo">
  <div class="img-wrapper">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="{photoData.url}">
  </div>
  <button class="like" on:click={like}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>
    {#if count > 0}
    <p>+{count}</p>
    {/if}
  </button>
  {#if count > 0}
  <div class="no-hearts">Hearts are not yet saved, We still feel it in our hearts though :)</div>
  {/if}
</div>

