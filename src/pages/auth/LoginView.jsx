import { toast } from "react-toastify";
import customApi from "../../api";
import FormAuth from "../../components/FormAuth";
import { redirect } from "react-router-dom";
import { loginUser } from "../../features/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customApi.post("/auth/login", data);
      store.dispatch(loginUser(response.data));
      toast.success("Login berhasil!");
      return redirect("/");
    } catch (error) {
      const errorMassage = error?.response?.data?.message;
      toast.error(errorMassage);
      return null;
    }
  };

const LoginView = () => {
  return (
    <main>
      <FormAuth />
    </main>
  );
};

export default LoginView;
