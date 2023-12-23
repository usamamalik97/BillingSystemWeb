interface SubProductInterface {
  products: any[];
}

const SubProduct = ({ products }: SubProductInterface) => {
  return (
    <table className="table table-hover table-light table-sm">
      <thead>
        <tr>
          <th scope="col">Purchase Date</th>
          <th scope="col">Cost Price</th>
          <th scope="col">Total Quantity</th>
          <th scope="col">Quantity Sold</th>
          <th scope="col">Quantity Remaining</th>
        </tr>
      </thead>
      <tbody className="table-group-divider tableItem table-light">
        {products.map((product) => (
          <tr key={product.itemId}>
            <td>{product.purchaseDate}</td>
            <td>{product.costPrice}</td>
            <td>{product.quantity}</td>
            <td>{product.quantitySold}</td>
            <td>{product.quantityRemaining}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubProduct;
