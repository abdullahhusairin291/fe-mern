import { toast } from "react-toastify";
import FormAuth from "../../components/FormAuth";
import customApi from "../../api";
import { registerUser } from "../../features/userSlice";
import { redirect } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customApi.post("/auth/register", data);
      store.dispatch(registerUser(response.data));
      toast.success("Register berhasil!");
      return redirect("/");
    } catch (error) {
      const errorMassage = error?.response?.data?.message;
      toast.error(errorMassage);
      return null;
    }
  };

const RegisterView = () => {
  return (
    <main>
      <FormAuth isRegister={true} />
    </main>
  );
};

export default RegisterView;
