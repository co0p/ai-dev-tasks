<script>
  export let item;
  const lastUsed = item.lastUsed ? item.lastUsed : "Never";
  const user = item.user ? item.user : "N/A";
</script>

<div class="catalog-item p-4 flex items-center border-b">
  <img src={item.image} alt={item.name} class="w-16 h-16 rounded mr-4" />
  <div>
    <div class="font-bold">{item.name}</div>
    <div class="text-sm text-gray-600">Last used: {lastUsed}</div>
    <div class="text-sm text-gray-600">By: {user}</div>
  </div>
</div>
