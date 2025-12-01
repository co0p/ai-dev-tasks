<script>
  import { onMount } from 'svelte';
  import { fetchCatalog } from '$lib/api.js';
  import CatalogItem from './CatalogItem.svelte';

  let catalog = [];
  let error = '';

  onMount(async () => {
    try {
      catalog = await fetchCatalog();
    } catch (e) {
      error = 'Could not load catalog data.';
    }
  });
</script>

{#if error}
  <div class="error">{error}</div>
{:else}
  {#each catalog as item}
    <CatalogItem {item} />
  {/each}
{/if}
