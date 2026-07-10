// src/components/ProductCard.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'
import type { Product } from '@/types/Product'

const product: Product = {
  id: 1,
  title: 'T-shirt',
  price: 19.99,
  description: '',
  images: ['img.jpg'],
  stock: 20,
  category: { id: 1, name: 'Vêtements' }
}

describe('ProductCard', () => {
  it('affiche le titre du produit', () => {
    const wrapper = mount(ProductCard, {
      props: { product }
    })

    expect(wrapper.text()).toContain('T-shirt')
  })
})