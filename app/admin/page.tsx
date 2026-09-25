'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product, Variant } from '../lib/products'
import WebpUploader from '../components/WebpUploader'

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState<{
    id: string
    name: string
    category: string
    customCategory: string
    shortDescription: string
    fullDescription: string
    image: string
    price: string
    priceRange: string
    features: string[]
    variants: Variant[]
    inStock: boolean
    featured: boolean
    rating: number
  }>({
    id: '',
    name: '',
    category: 'Nuts',
    customCategory: '',
    shortDescription: '',
    fullDescription: '',
    image: '',
    price: '',
    priceRange: '100g - 1kg',
    features: ['100% Natural', 'Premium Quality'],
    variants: [{ name: 'Regular Pack (100g)', price: '' }],
    inStock: true,
    featured: false,
    rating: 5.0,
  })

  // Feature tag input state
  const [newFeatureInput, setNewFeatureInput] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      showNotification('error', 'Could not load products. Please refresh.')
    } finally {
      setLoading(false)
    }
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  // Get categories list
  const categoriesList = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Modal Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null)
    setFormData({
      id: '',
      name: '',
      category: 'Nuts',
      customCategory: '',
      shortDescription: '',
      fullDescription: '',
      image: '',
      price: '',
      priceRange: '100g - 1kg',
      features: ['100% Natural', 'Premium Quality'],
      variants: [{ name: 'Regular Pack (100g)', price: '' }],
      inStock: true,
      featured: false,
      rating: 5.0,
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      customCategory: '',
      shortDescription: product.shortDescription || '',
      fullDescription: product.fullDescription || '',
      image: product.image || '',
      price: product.price || '',
      priceRange: product.priceRange || '100g - 1kg',
      features: product.features || [],
      variants: product.variants && product.variants.length > 0 ? product.variants : [{ name: 'Standard (100g)', price: product.price }],
      inStock: product.inStock !== false,
      featured: Boolean(product.featured),
      rating: product.rating || 5.0,
    })
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.price.trim()) {
      showNotification('error', 'Please fill in product name and pricing.')
      return
    }

    const finalCategory = formData.category === 'NEW'
      ? formData.customCategory.trim() || 'General'
      : formData.category

    const payload = {
      ...formData,
      category: finalCategory,
    }

    setIsSubmitting(true)
    try {
      if (editingProduct) {
        // Update product
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Update failed')
        const updated = await res.json()
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)))
        showNotification('success', `Product "${updated.name}" updated successfully!`)
      } else {
        // Create product
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Creation failed')
        const created = await res.json()
        setProducts([created, ...products])
        showNotification('success', `Product "${created.name}" created successfully!`)
      }
      setIsModalOpen(false)
    } catch (error) {
      showNotification('error', 'Failed to save product. Please check inputs.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete Handlers
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!productToDelete) return
    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Delete failed')
      setProducts(products.filter((p) => p.id !== productToDelete.id))
      showNotification('success', `Product "${productToDelete.name}" deleted.`)
      setIsDeleteModalOpen(false)
      setProductToDelete(null)
    } catch (error) {
      showNotification('error', 'Failed to delete product.')
    }
  }

  // Reset to defaults
  const handleResetDefaults = async () => {
    if (confirm('Are you sure you want to reset all products back to default catalog? Any custom products will be overwritten.')) {
      try {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'reset' }),
        })
        if (!res.ok) throw new Error('Reset failed')
        const data = await res.json()
        setProducts(data.products)
        showNotification('success', 'Catalog reset to default products.')
      } catch (error) {
        showNotification('error', 'Failed to reset catalog.')
      }
    }
  }

  // Feature Tag Helpers
  const handleAddFeature = () => {
    if (newFeatureInput.trim() && !formData.features.includes(newFeatureInput.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeatureInput.trim()],
      })
      setNewFeatureInput('')
    }
  }

  const handleRemoveFeature = (feat: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feat),
    })
  }

  // Variant Helpers
  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: '', price: '' }],
    })
  }

  const handleVariantChange = (index: number, field: 'name' | 'price', value: string) => {
    const updated = [...formData.variants]
    updated[index][field] = value
    setFormData({ ...formData, variants: updated })
  }

  const handleRemoveVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    })
  }

  const getEmoji = (category: string) => {
    switch (category) {
      case 'Nuts': return '🥜'
      case 'Dairy': return '🥛'
      case 'Dry Fruits': return '🍇'
      case 'Treats': return '🍯'
      default: return '🎁'
    }
  }

  return (
    <div className="min-h-screen bg-goodiiz-cream-light pt-24 sm:pt-30 md:pt-36 pb-12 px-3 sm:px-6 md:px-8">
      {/* Notifications Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 left-4 sm:left-auto z-50 px-4 sm:px-6 py-3 rounded-xl shadow-lg flex items-center gap-2.5 transition animate-bounce ${
            notification.type === 'success'
              ? 'bg-goodiiz-green text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          <span className="font-bold text-base">{notification.type === 'success' ? '✓' : '⚠'}</span>
          <span className="font-medium text-xs sm:text-sm">{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-8">
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-card border border-goodiiz-gold/15">
          <div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-goodiiz-brown/60 mb-1">
              <Link href="/" className="hover:text-goodiiz-green font-medium">Store Home</Link>
              <span>/</span>
              <span className="text-goodiiz-gold font-bold">Admin Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-goodiiz-green flex flex-wrap items-center gap-2 sm:gap-3">
              <span>GOODIIZ Admin</span>
              <span className="text-[10px] sm:text-xs bg-goodiiz-gold/20 text-goodiiz-gold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Product Manager
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-goodiiz-brown/70 mt-1">
              Add new products, set pricing, descriptions, variants & convert images to WebP.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              onClick={handleOpenAddModal}
              className="bg-goodiiz-green hover:bg-goodiiz-green-dark text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-card hover:shadow-card-hover transition flex items-center justify-center gap-2 order-1 sm:order-3"
            >
              <span className="text-base font-bold">+</span> Add Product
            </button>

            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 order-2">
              <Link
                href="/products"
                target="_blank"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-goodiiz-green text-goodiiz-green hover:bg-goodiiz-green hover:text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 text-center"
              >
                <span>↗</span> View Store
              </Link>

              <button
                onClick={handleResetDefaults}
                className="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 font-medium text-xs sm:text-sm transition text-center"
                title="Reset catalog to standard seed products"
              >
                Reset Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-card border-l-4 border-goodiiz-green">
            <p className="text-[10px] sm:text-xs text-goodiiz-brown/60 uppercase font-semibold">Total Products</p>
            <p className="text-xl sm:text-3xl font-bold text-goodiiz-green mt-0.5 sm:mt-1">{products.length}</p>
          </div>
          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-card border-l-4 border-goodiiz-gold">
            <p className="text-[10px] sm:text-xs text-goodiiz-brown/60 uppercase font-semibold">Categories</p>
            <p className="text-xl sm:text-3xl font-bold text-goodiiz-gold mt-0.5 sm:mt-1">
              {Array.from(new Set(products.map((p) => p.category))).length}
            </p>
          </div>
          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-card border-l-4 border-emerald-600">
            <p className="text-[10px] sm:text-xs text-goodiiz-brown/60 uppercase font-semibold">In Stock</p>
            <p className="text-xl sm:text-3xl font-bold text-emerald-700 mt-0.5 sm:mt-1">
              {products.filter((p) => p.inStock !== false).length}
            </p>
          </div>
          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-card border-l-4 border-amber-600">
            <p className="text-[10px] sm:text-xs text-goodiiz-brown/60 uppercase font-semibold">Featured</p>
            <p className="text-xl sm:text-3xl font-bold text-amber-700 mt-0.5 sm:mt-1">
              {products.filter((p) => p.featured).length}
            </p>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 border border-goodiiz-gold/15">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-goodiiz-cream-dark rounded-xl text-xs sm:text-sm focus:outline-none focus:border-goodiiz-green text-goodiiz-brown"
            />
            <span className="absolute left-3 top-2 text-goodiiz-brown/40 text-xs sm:text-sm">🔍</span>
          </div>

          {/* Categories Pill Buttons (Horizontal Swipe Rail on Mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none snap-x w-full md:w-auto">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`snap-start shrink-0 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-goodiiz-green text-white shadow-sm'
                    : 'bg-goodiiz-cream text-goodiiz-brown hover:bg-goodiiz-cream-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products List Table / Grid */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-card">
            <div className="w-10 h-10 border-4 border-goodiiz-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-goodiiz-brown font-medium text-xs sm:text-sm">Loading catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl shadow-card space-y-3 sm:space-y-4 p-4">
            <span className="text-4xl sm:text-5xl">📦</span>
            <h3 className="text-lg sm:text-xl font-bold text-goodiiz-green">No products found</h3>
            <p className="text-xs sm:text-sm text-goodiiz-brown/70 max-w-md mx-auto">
              No items match your search or filter. Try a different query or add a new product.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="bg-goodiiz-green text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-card hover:bg-goodiiz-green-dark transition"
            >
              + Add First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-card hover:shadow-card-hover transition overflow-hidden flex flex-col border border-goodiiz-gold/15 group justify-between"
              >
                {/* Product Image Banner */}
                <div className="relative h-28 sm:h-40 md:h-48 bg-goodiiz-cream flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        ;(e.target as HTMLElement).style.display = 'none'
                      }}
                    />
                  ) : (
                    <span className="text-3xl sm:text-5xl md:text-6xl">{getEmoji(product.category)}</span>
                  )}

                  {/* Category & Stock Badges */}
                  <div className="absolute top-1.5 sm:top-3 left-1.5 sm:left-3 flex flex-col gap-0.5 sm:gap-1">
                    <span className="bg-goodiiz-green/90 backdrop-blur-sm text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="bg-goodiiz-gold text-white text-[7px] sm:text-[9px] font-bold px-1 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute top-1.5 sm:top-3 right-1.5 sm:right-3">
                    <span
                      className={`text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${
                        product.inStock !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.inStock !== false ? 'In Stock' : 'Out'}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-bold text-xs sm:text-base md:text-lg text-goodiiz-green leading-tight line-clamp-1 sm:line-clamp-none">
                        {product.name}
                      </h3>
                      <span className="text-[9px] sm:text-xs text-goodiiz-brown/50 font-mono shrink-0">
                        #{product.id}
                      </span>
                    </div>

                    <p className="text-goodiiz-brown/70 text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-2 leading-tight sm:leading-relaxed">
                      {product.shortDescription || product.fullDescription}
                    </p>

                    {/* Features Preview */}
                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2.5">
                        {product.features.slice(0, 2).map((f) => (
                          <span
                            key={f}
                            className="bg-goodiiz-cream text-goodiiz-brown text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded font-medium truncate max-w-full"
                          >
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Pricing & Variants Count */}
                    <div className="border-t border-goodiiz-cream pt-2 flex items-center justify-between gap-1">
                      <div>
                        <p className="text-goodiiz-gold font-bold text-xs sm:text-base leading-tight">{product.price}</p>
                        <p className="text-[9px] sm:text-[10px] text-goodiiz-brown/60 truncate max-w-[80px] sm:max-w-none">{product.priceRange || 'Standard'}</p>
                      </div>

                      {product.variants && product.variants.length > 0 && (
                        <span className="bg-goodiiz-cream-dark/50 text-goodiiz-brown text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0">
                          {product.variants.length} Var
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-1.5 pt-2">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="w-full bg-goodiiz-cream hover:bg-goodiiz-cream-dark text-goodiiz-green text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <span>✏</span> Edit
                      </button>

                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="w-full bg-red-50 hover:bg-red-100 text-red-700 text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <span>🗑</span> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[96vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-fade-in my-auto">
            {/* Modal Header */}
            <div className="bg-goodiiz-green text-white p-4 sm:p-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <p className="text-[11px] sm:text-xs text-white/80 mt-0.5">
                  Set product details, descriptions, variants, and WebP images.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-base sm:text-lg transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Scrollable Body */}
            <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1 text-goodiiz-brown">
              {/* Basic Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Premium Roasted Cashews"
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-xl focus:outline-none focus:border-goodiiz-green"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-xl focus:outline-none focus:border-goodiiz-green bg-white"
                  >
                    <option value="Nuts">Nuts (Almonds, Cashews, Pista)</option>
                    <option value="Dry Fruits">Dry Fruits (Raisins, Amla, Dates)</option>
                    <option value="Dairy">Dairy (Ghee, Butter)</option>
                    <option value="Treats">Treats (Honey, Spreads, Sweets)</option>
                    <option value="NEW">+ Add Custom Category...</option>
                  </select>

                  {formData.category === 'NEW' && (
                    <input
                      type="text"
                      placeholder="Enter new category name"
                      value={formData.customCategory}
                      onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                      className="mt-2 w-full px-3 py-2 text-xs sm:text-sm border border-goodiiz-gold rounded-xl focus:outline-none focus:border-goodiiz-green"
                      required
                    />
                  )}
                </div>
              </div>

              {/* Pricing & Weight Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1">
                    Display Price / Range *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹230 - ₹1,250"
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-xl focus:outline-none focus:border-goodiiz-green"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1">
                    Package / Weight Range
                  </label>
                  <input
                    type="text"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    placeholder="e.g. 100g - 1kg or 250ml - 1L"
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-xl focus:outline-none focus:border-goodiiz-green"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1">
                  Short Tagline / Teaser
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="e.g. Handpicked organic cashew nuts roasted to crunchy golden perfection."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-xl focus:outline-none focus:border-goodiiz-green"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1">
                  Full Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed description of sourcing, nutritional benefits, aroma, recipe pairing, etc."
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-xl focus:outline-none focus:border-goodiiz-green"
                />
              </div>

              {/* WebP Image Converter & Uploader Section */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1.5">
                  Product Image & WebP Optimizer
                </label>
                <WebpUploader
                  currentImage={formData.image}
                  productName={formData.name || 'product'}
                  onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                />
              </div>

              {/* Key Features / Highlights */}
              <div className="bg-goodiiz-cream/40 p-3.5 sm:p-4 rounded-xl space-y-2.5 sm:space-y-3">
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green">
                  Key Feature Badges
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddFeature()
                      }
                    }}
                    placeholder="e.g. Rich in Omega-3, Zero Preservatives"
                    className="flex-1 px-3 py-1.5 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-lg focus:outline-none focus:border-goodiiz-green bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="bg-goodiiz-green text-white text-xs px-3.5 py-1.5 rounded-lg hover:bg-goodiiz-green-dark transition font-semibold shrink-0"
                  >
                    + Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {formData.features.map((feat) => (
                    <span
                      key={feat}
                      className="bg-white border border-goodiiz-gold/30 text-goodiiz-brown text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>✓ {feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feat)}
                        className="text-red-500 hover:text-red-700 font-bold ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Available Variants Builder */}
              <div className="bg-goodiiz-cream/40 p-3.5 sm:p-4 rounded-xl space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green">
                      Packaging Variants & Options
                    </label>
                    <p className="text-[10px] sm:text-[11px] text-goodiiz-brown/60">
                      Add different package sizes or grades with individual prices.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="bg-goodiiz-gold hover:bg-goodiiz-gold-dark text-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold transition shadow-2xs shrink-0"
                  >
                    + Add Size
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {formData.variants.map((variant, index) => (
                    <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 250g Pack"
                        value={variant.name}
                        onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-lg bg-white focus:outline-none focus:border-goodiiz-green"
                      />
                      <input
                        type="text"
                        placeholder="e.g. ₹350"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                        className="w-24 sm:w-32 px-2.5 py-1.5 text-xs sm:text-sm border border-goodiiz-cream-dark rounded-lg bg-white focus:outline-none focus:border-goodiiz-green"
                      />
                      {formData.variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(index)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Toggles */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-2 border-t border-goodiiz-cream">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-goodiiz-green rounded accent-goodiiz-green"
                  />
                  <span className="text-xs font-semibold text-goodiiz-brown">
                    In Stock & Available
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-goodiiz-gold rounded accent-goodiiz-gold"
                  />
                  <span className="text-xs font-semibold text-goodiiz-brown">
                    Feature on Homepage Highlights
                  </span>
                </label>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-3 sm:pt-4 border-t border-goodiiz-cream flex items-center justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-goodiiz-green hover:bg-goodiiz-green-dark text-white px-5 sm:px-7 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-card hover:shadow-card-hover transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : editingProduct ? (
                    'Save Changes'
                  ) : (
                    'Create Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full p-5 sm:p-6 text-center space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-xl sm:text-2xl">
              🗑
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-goodiiz-green">
              Delete Product?
            </h3>
            <p className="text-xs sm:text-sm text-goodiiz-brown/80">
              Are you sure you want to delete <strong className="text-goodiiz-green">{productToDelete.name}</strong>? This action cannot be undone.
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-3 sm:pt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="py-2 sm:py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs sm:text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
