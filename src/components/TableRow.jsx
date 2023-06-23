export default function TableRow({ snack }) {
  const { id, product_name, product_weight, price, calories, ingredients } =
    snack;
  return (
    <tr className="border border-black">
      <td className="border-x border-black px-2 py-1">{id}</td>
      <td className="border-x border-black px-2 py-1">{product_name}</td>
      <td className="border-x border-black px-2 py-1">{product_weight}kg</td>
      <td className="border-x border-black px-2 py-1">{price}</td>
      <td className="border-x border-black px-2 py-1">{calories}</td>
      <td className="border-x border-black px-2 py-1">
        {ingredients.join(",")}
      </td>
    </tr>
  );
}
