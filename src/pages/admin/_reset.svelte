<script>
  import { url } from '@roxi/routify/runtime/helpers';
  import { valuesForm, Field } from 'svelte-formly'
  import { get } from 'svelte/store'
  import { admin } from '../../pages/_stores'
  import { postApi } from '../../utils/crud';

  if (localStorage.getItem('admin') === 'true') {
    admin.set(true)
  }

  async function handleSubmit() {
    const values = get(valuesForm)
    const formData = new FormData()
    formData.append('password', values.values.password)
    const response = await postApi('API_URL/admin', formData)
    console.log("🚀 ~ file: _layout.svelte ~ line 13 ~ handleSubmit ~ response", response)
    if (response) {
      admin.set(true)
      localStorage.setItem('admin', true)
    } else {
      alert('Bad Password')
    }
  }

  const loginField = [
    {
      type: 'input',
      name: 'password',
      attributes: {
        type: 'password',
        classes: ['text-input'],
        placeholder: 'Enter the admin password',
      },
      rules: ['required'],
      messages: {
        required: 'Password is required!'
      }
    },
  ]
</script>
  
<style>
  div {
    display: grid;
    justify-content: center;
  }
  form {
    width: 50%;
    min-width: 340px;
    margin: 1rem auto;
    padding: 1rem;
    border: 2px solid var(--lightgreen);
  }

  form :global(.text-input) {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    margin: 1rem 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 2px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  form :global(button) {
    font-family: inherit;
    font-size: inherit;
    padding: 0.4em;
    margin: 0.5rem 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    cursor: pointer;
  }

  form :global(.invalid-feedback) {
    color: var(--coral);
  }
  h1 {
    margin: 0 auto;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 100;
    margin: 2rem 0 .5rem;
  }

  @media (max-width: 420px) {
    h1 {
      margin: 1rem 0 .25rem;
    }
  }

  a {
    display: grid;
    justify-content: center;
  }
  a {
    text-decoration: none;
  }

  a:visited, a:hover, a:link {
    color: inherit;
  }

</style>
<a href="{$url('/')}">
  <h1>Barbre.Family</h1>
</a>
{#if $admin}
  <slot></slot>
{:else}
  <div>
    <form on:submit|preventDefault="{handleSubmit}">
      <Field fields={loginField}/>
      <button type="submit">Submit</button>
    </form>
  </div>
{/if}