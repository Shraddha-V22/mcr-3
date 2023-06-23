import { useState } from "react";
import TableRow from "./components/TableRow";
import { useSnacks } from "./contexts/SnackContext";

function App() {
  const {
    snacksData: { filteredData },
    dispatch,
  } = useSnacks();

  return (
    <section className="m-4 flex flex-col gap-4">
      <input
        type="text"
        placeholder="search with products or ingredrients..."
        className="w-[400px] border border-black p-1 indent-2 outline-none placeholder:capitalize"
        onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
      />
      <table className="table-auto">
        <thead className="">
          <tr className="border border-black font-semibold">
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
    <td className="relative border-x border-black p-1">
      <h1
        className="cursor-pointer"
        onClick={() => setShowSorts((prev) => !prev)}
      >
        {title}
      </h1>
      {showSorts && (
        <div className="absolute w-[80px] bg-white">
          <div className="flex items-center gap-1 px-2">
            <input
              onChange={changeHandler}
              type="radio"
              name={name}
              id="htl"
              value="htl"
              // className="hidden"
            />
            <label htmlFor="htl">asc</label>
          </div>
          <div className="flex items-center gap-1 px-2">
            <input
              onChange={changeHandler}
              type="radio"
              name={name}
              id="lth"
              value="lth"
              // className="hidden"
            />
            <label htmlFor="lth">des</label>
          </div>
          <div className="flex items-center gap-1 px-2">
            <input
              onChange={changeHandler}
              type="radio"
              name={name}
              id="reset"
              value="reset"
              // className="hidden"
            />
            <label htmlFor="reset">reset</label>
          </div>
        </div>
      )}
    </td>
  );
}
