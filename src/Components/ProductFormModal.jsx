export default function ProductFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingProduct,
  formData,
  onInputChange,
  categories,
  submitting 
}) {
  if (!isOpen) return null;


  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-xl font-bold text-gray-800">
            {editingProduct ? 'Edit Product' : 'Create New Product'}
          </h2>
          <button

            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}

              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onInputChange}
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
            <input

              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={onInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select

              name="categoryId"


              value={formData.categoryId}
              onChange={onInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (

                <option key={category.categoryID || category.id}
                
                 value={category.categoryID || category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block
             text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}

              onChange={onInputChange}

              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Product description (optional)"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"

              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button

              type="submit"

              disabled={submitting}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {submitting ? 'Saving' : (editingProduct ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}