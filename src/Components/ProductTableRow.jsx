export default function ProductTableRow({ product , onEdit, onDelete, getCategoryName }) {
  return (
    <tr className="hover:bg-gray-50">

      <td className="px-6 py-4 text-sm font-mono text-gray-900 font-medium">{product.id}</td>
      <td className="px-6 py-4">

        <div className="font-medium text-gray-900">{product.name}</div>
        {product.description && (
          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>)}
      </td>

      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
        ${product.price.toFixed(2)}

      </td>
      <td className="px-6 py-4">

        <span className="text-sm font-bold text-gray-900">
          {product.quantity }
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        { getCategoryName(product.categoryId)} // for check
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button

          onClick={() => onEdit(product)}
          className="text-gray-600 hover:text-gray-900 font-medium">
          Edit

        </button>

        <button onClick={() => onDelete(product)}
          className="text-red-600 hover:text-red-900 font-medium">
          Delete
          
        </button>
      </td>
    </tr>
  );
}