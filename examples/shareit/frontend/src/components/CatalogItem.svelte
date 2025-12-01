<script>
  export let item;
</script>

<div class="catalog-item">
  <img src={item.imageUrl} alt={item.name} />
  <div>{item.name}</div>
  <div>Last used: {item.lastUsed}</div>
  <div>By: {item.user}</div>
</div>
