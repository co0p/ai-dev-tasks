<script>
  import { onMount } from 'svelte';
  import { fetchCatalog } from '$lib/api.js';
  import CatalogItem from './CatalogItem.svelte';

  /**
   * @typedef {Object} CatalogEntry
   * @property {number} id
   * @property {string} name
   * @property {string} imageUrl
   * @property {string} lastUsed
   * @property {string} user
   */

  /** @type {CatalogEntry[]} */
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
  <div class="catalog-list max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
    <div class="flex flex-col gap-4">
      {#each catalog as item}
        <CatalogItem {item} />
      {/each}
    </div>
  </div>
{/if}
