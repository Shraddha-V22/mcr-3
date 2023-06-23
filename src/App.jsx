import { useState } from "react";
import TableRow from "./components/TableRow";
import { useSnacks } from "./contexts/SnackContext";

function App() {
  const {
    snacksData: { filteredData },
    dispatch,
  } = useSnacks();

  return (
    <section>
      <input
        type="text"
        placeholder="search with products or ingredrients..."
        className="border border-black outline-none"
        onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
      />
      <table className="table-auto">
        <thead className="">
          <tr className="font-semibold">
            <TableHeaderCell title="Id" name="id" />
            <TableHeaderCell title="Product Name" name="product_name" />
            <TableHeaderCell title="Product Weight" name="product_weight" />
            <TableHeaderCell title="Price" name="price" />
            <TableHeaderCell title="Calories" name="calories" />
            <TableHeaderCell title="Ingredients" name="ingredients" />
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((snack) => (
            <TableRow key={snack.id} snack={snack} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default App;

function TableHeaderCell({ title, name }) {
  const { dispatch } = useSnacks();
  const [showSorts, setShowSorts] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    dispatch({ type: "SORT_SNACKS", payload: { name, value } });
  };

  return (
    <td className="relative">
      <h1
        className="cursor-pointer"
        onClick={() => setShowSorts((prev) => !prev)}
      >
        {title}
      </h1>
      {showSorts && (
        <div className="absolute w-[60px] bg-white">
          <div>
            <label htmlFor="htl">asc</label>
            <input
              onChange={changeHandler}
              type="radio"
              name={name}
              id="htl"
              value="htl"
            />
          </div>
          <div>
            <label htmlFor="lth">des</label>
            <input
              onChange={changeHandler}
              type="radio"
              name={name}
              id="lth"
              value="lth"
            />
          </div>
          <div>
            <label htmlFor="reset">reset</label>
            <input
              onChange={changeHandler}
              type="radio"
              name={name}
              id="reset"
              value="reset"
            />
          </div>
        </div>
      )}
    </td>
  );
}
