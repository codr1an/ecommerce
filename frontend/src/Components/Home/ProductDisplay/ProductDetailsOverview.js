const ProductImage = ({ product }) => {
  return (
    <div className="product">
      <a href={`/products/${product.id}`} className="product-link">
        <h3>{product.name}</h3>
        <p>Price: {product.price}€</p>
        {product.imageUrl && (
          <img
            src={require(`../../../../productImages/${product.imageUrl}`)}
            alt={product.name}
          />
        )}
      </a>
    </div>
  );
};

export default ProductImage;
