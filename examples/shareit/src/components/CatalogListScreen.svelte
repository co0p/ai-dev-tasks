<script>
  import CatalogItem from './CatalogItem.svelte';
  import data from '../data/sample-catalog.json';
</script>

<div class="catalog-list max-w-md mx-auto mt-8">
  {#each data as item}
    <CatalogItem {item} />
  {/each}
</div>
