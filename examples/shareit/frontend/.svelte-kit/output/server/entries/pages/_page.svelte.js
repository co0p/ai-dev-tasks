import "clsx";
import { x as attr, y as bind_props, z as ensure_array_like } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/context.js";
function CatalogItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let item = $$props["item"];
    function fallback(value, defaultValue) {
      return value ?? defaultValue;
    }
    const lastUsed = fallback(item.lastUsed, "Never");
    const lastUser = fallback(item.lastUser, "N/A");
    $$renderer2.push(`<div class="catalog-item flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"><img${attr("src", item.image)}${attr("alt", item.name)} class="w-16 h-16 rounded-lg object-cover border border-gray-200"/> <div class="flex flex-col justify-center"><div class="font-semibold text-lg text-gray-800">${escape_html(item.name)}</div> <div class="text-xs text-gray-500 mt-1">Last used: <span class="font-medium">${escape_html(lastUsed)}</span></div> <div class="text-xs text-gray-500">By: <span class="font-medium">${escape_html(lastUser)}</span></div></div></div>`);
    bind_props($$props, { item });
  });
}
function CatalogListScreen($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let catalog = [];
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="catalog-list max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md"><div class="flex flex-col gap-4"><!--[-->`);
      const each_array = ensure_array_like(catalog);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        CatalogItem($$renderer2, { item });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  $$renderer.push(`<h1 class="text-2xl font-bold mb-4">ShareIt Catalog</h1> `);
  CatalogListScreen($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
