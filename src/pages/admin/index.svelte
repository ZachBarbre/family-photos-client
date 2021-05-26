<script>
  import { get } from 'svelte/store'
  import { valuesForm, Field } from 'svelte-formly'
  import { goto, url } from '@roxi/routify'
  import { postApi, putApi, deleteApi } from '../../utils/crud'
  import Loader from '../_componets/Loader.svelte';
  
  let formType = 'Upload';
  let newUrl = ''
  let result = ''
  let loading = false

  const uploadFields = [
    {
      type: 'file',
      name: 'photo',
      attributes: {
        id: 'photo', // optional
        classes: ['text-input', 'file-input'], // optional
      },
      extra: {
        multiple: false, // optional
        showPreview: true // optional
      },
      rules: ['file', 'required'],
      file: {
        types: 'jpg,png,jpeg',
        maxsize: 10,
      },
      messages: {
        required: 'A photo is required!'
      }
    },
    {
      type: 'input',
      name: 'description',
      attributes: {
        type: 'text',
        classes: ['text-input'],
        placeholder: 'Enter the photo description',
      },
      rules: ['required'],
      messages: {
        required: 'Description is required!'
      }
    },
  ]
  const updateFields = [
    {
      type: 'input',
      name: 'id',
      attributes: {
        type: 'text',
        classes: ['text-input'],
        placeholder: 'Enter the photo id (photo/:id)',
      },
      rules: ['required'],
      messages: {
        required: 'Id is required!'
      }
    },
    {
      type: 'input',
      name: 'description',
      attributes: {
        type: 'text',
        classes: ['text-input'],
        placeholder: 'Enter the new photo description',
      },
      rules: ['required'],
      messages: {
        required: 'Description is required!'
      }
    },
  ]
  const deleteFields = [
    {
      type: 'input',
      name: 'id',
      attributes: {
        type: 'text',
        classes: ['text-input'],
        placeholder: 'Enter the photo id (photo/:id)',
      },
      rules: ['required'],
      messages: {
        required: 'Id is required!'
      }
    },
  ]
  
  function handleFormType(evt) {
    formType = evt.target.innerText
  }
  async function onSubmitUpload(){
    const values = get(valuesForm)
    if (values.valid) {
      loading = true
      const formData = new FormData()
      formData.append('description', values.values.description)
      formData.append('image', values.values.photo[0])
      const data = await postApi('API_URL/photos', formData)
      loading = false
      if (data) {
        result = 'Success! See the new photo at:'
        newUrl = `photo/${data.data[0].id}`
      }
    } else {
      alert('Attatch a file!')
    }
  }
  async function onSubmitUpdate(){
    loading = true
    const values = get(valuesForm)
    const formData = new FormData()
    formData.append('description', values.values.description)
    const data = await putApi(`API_URL/photos/photo/${values.values.id}`, formData)
    loading = false
    if (data) {
        result = 'Success! See the revised photo at:'
        newUrl = `/photo/${data.data[0].id}`
      }
    
  }
  async function onSubmitDelete(){
    loading = true
    const values = get(valuesForm)
    const data = await deleteApi(`API_URL/photos/photo/${values.values.id}`)
    if (data) {
        result = `Success! Photo ${data.data[0].id} was deleted. `
      }
  }
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .type-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .type-buttons button {
    font-family: inherit;
    font-size: 1.25rem;
    padding: 0.5em;
    margin: 0.5rem 0;
    box-sizing: border-box;
    border: 1px solid var(--greyblue);
    border-radius: 2px;
    cursor: pointer;
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

  form :global(.file-input) {
    overflow: hidden;
    cursor: pointer;
  }

  form :global(.file) {
    margin-bottom: 1rem;    
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

  form :global(ul) {
    margin: .5rem 0 .25rem
  }

  .result {
    text-align: center;
  }

  .result h3 {
    color: var(--coral);
  }

  .result a {
    font-size: large;
    color: var(--greyblue);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:visited {
    color: var(--lightgreen);
  }
</style>

<section>
  <div class="type-buttons">
    <button on:click="{handleFormType}">Upload</button>
    <button on:click="{handleFormType}">Update</button>
    <button on:click="{handleFormType}">Delete</button>
  </div>
  {#if formType === 'Upload'}
    <form on:submit|preventDefault="{onSubmitUpload}" class="form">
      <h2>Upload Photo</h2>
      <!-- <label for="photo">Choose a Photo</label> -->
      <Field fields={uploadFields} />
      <button type="submit">Submit</button>  
    </form>
    {#if result}
      <div class="result">
        <h3>{result}</h3>
        <a href="{$url(`/${newUrl}`)}">https://barbre.family/{newUrl}</a>
      </div>
    {/if}
  {:else if formType === 'Update'}
    <form on:submit|preventDefault="{onSubmitUpdate}" class="form">
      <h2>Change Photo Description</h2>
      <Field fields={updateFields} />
      <button type="submit">Submit</button>  
    </form>
    {#if result}
      <div class="result">
        <h3>{result}</h3>
        <a href="{$url(`../${newUrl}`)}">https://barbre.family{newUrl}</a>
      </div>
    {/if}
  {:else}
    <form on:submit|preventDefault="{onSubmitDelete}" class="form">
      <h2>Delete Photo</h2>
      <Field fields={deleteFields} />
      <button type="submit">Submit</button>  
    </form>
    {#if result}
      <div class="result">
        <h3>{result}</h3>
      </div>
    {/if}
  {/if}
  {#if loading}
    <Loader />
  {/if}
</section>
