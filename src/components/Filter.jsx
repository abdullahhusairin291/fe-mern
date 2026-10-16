import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";

const Filter = () => {
  const { params } = useLoaderData();
  const { name, category } = params;
  const categories = ["110 ml", "200 ml", "250 ml", "500 ml", "1 liter"];

  return (
    <Form
      method="get"
      className="bg-base-200 rounded-md py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center"
    >
      <FormInput label="Search" type="search" name="name" def={name} />
      <FormSelect
        label="Category"
        name="category"
        list={categories}
        def={category}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <Link to="/products" className="btn btn-outline btn-neutral">
        Reset
      </Link>
    </Form>
  );
};

export default Filter;
