import { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import customApi from "../api";
import Loading from "../components/Loading";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextArea from "../components/Form/FormTextArea";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Anda harus login dulu");
    redirect("/login");
  }

  if (user.role !== "owner") {
    toast.warn("Anda tidak bisa mengakses halaman ini");
    return redirect("/");
  }
  return null;
};

const EditProductView = () => {
  const categories = ["110 ml", "200 ml", "250 ml", "500 ml", "1 liter"];
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const getProductId = async () => {
      try {
        const { data } = await customApi.get(`/product/${id}`);
        setProduct(data.data);
        setPreview(data.data.image);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Produk tidak ditemukan");
        navigate("/products");
      }
    };
    getProductId();
  }, [id, navigate]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPreview(product.image);
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    const dataForm = new FormData(event.target);
    const imageFile = dataForm.get("image");

    setIsLoading(true);
    try {
      let imageUrl = product.image;

      if (imageFile && imageFile.size > 0) {
        const uploadForm = new FormData();
        uploadForm.append("image", imageFile);
        const { data: upload } = await customApi.post(
          "/product/file-upload",
          uploadForm,
        );
        imageUrl = upload.image;
      }

      await customApi.put(`/product/${id}`, {
        name: dataForm.get("name"),
        price: dataForm.get("price"),
        stock: dataForm.get("stock"),
        description: dataForm.get("description"),
        category: dataForm.get("category"),
        image: imageUrl,
      });

      toast.success("Berhasil update produk");
      navigate("/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return <Loading />;

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Produk</h1>
        <Link to="/products" className="btn btn-ghost btn-sm">
          ← Kembali
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card border border-base-300 bg-base-100 shadow-sm"
      >
        <fieldset disabled={isLoading} className="card-body gap-5">
          <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-box border border-dashed border-base-300 bg-base-200">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="px-2 text-center text-sm opacity-60">
                  Belum ada gambar
                </span>
              )}
            </div>

            <fieldset className="fieldset self-center">
              <legend className="fieldset-legend">Gambar Produk</legend>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-primary w-full"
              />
              <p className="label">
                Kosongkan jika tidak ingin mengganti gambar
              </p>
            </fieldset>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              name="name"
              label="Nama Produk"
              type="text"
              def={product.name}
            />
            <FormSelect
              name="category"
              label="Kategori"
              list={categories}
              def={product.category}
            />
            <FormInput
              name="price"
              label="Harga Produk"
              type="number"
              def={product.price}
            />
            <FormInput
              name="stock"
              label="Stok Produk"
              type="number"
              def={product.stock}
            />
          </div>

          <FormTextArea
            name="description"
            label="Deskripsi Produk"
            defaultValue={product.description}
          />

          <div className="mt-2 flex justify-end gap-3">
            <Link
              to="/products"
              className={`btn btn-ghost ${isLoading ? "btn-disabled" : ""}`}
            >
              Batal
            </Link>
            <button
              type="submit"
              className="btn btn-primary min-w-40"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="loading loading-spinner loading-sm" />
              )}
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default EditProductView;
