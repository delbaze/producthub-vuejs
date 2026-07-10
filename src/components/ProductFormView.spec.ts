// src/views/ProductFormView.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ProductFormView from "./ProductFormView.vue";
import { useProductStore } from "@/stores/products";

// On simule le service catégories : jamais de vrai appel réseau pendant un test
vi.mock("@/services/categoryService", () => ({
  fetchCategories: vi.fn().mockResolvedValue([
    { id: 1, name: "Électronique" },
    { id: 2, name: "Vêtements" },
  ]),
}));

// On simule le router, puisque ProductFormView appelle useRouter()
const pushMock = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("ProductFormView - création", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("appelle addProduct avec les bonnes données et redirige vers la liste", async () => {
    const wrapper = mount(ProductFormView, {
      global: {
        plugins: [createTestingPinia({ stubActions: true, createSpy: vi.fn })],
      },
    });

    await flushPromises();

    const productStore = useProductStore();

await wrapper.find('[data-test="title-input"]').setValue('Casque audio')
await wrapper.find('[data-test="price-input"]').setValue(59)
await wrapper.find('[data-test="category-select"]').setValue('1')

    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(productStore.addProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Casque audio",
        price: 59,
        categoryId: 1,
      }),
    );
    expect(pushMock).toHaveBeenCalledWith({ name: "products" });
  });
});
