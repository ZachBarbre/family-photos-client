<!-- routify:options preload="proximity" -->

<style>
  header {
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  h1 {
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 100;
    margin: 2rem 0 .5rem;
  }

  p {
    font-size: 1rem;
    font-weight: 300;
  }

  @media (max-width: 420px) {
    h1 {
      margin: 1rem 0 .25rem;
    }
  }
</style>

<header>
	<h1>Barbre.Family</h1>
	<p>Zach, Kira and Anna</p>
</header>
<slot />

