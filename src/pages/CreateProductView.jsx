import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customApi from "../api";
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

const CreateProductView = () => {
  const categories = ["110 ml", "200 ml", "250 ml", "500 ml", "1 liter"];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    const dataForm = new FormData(event.target);
    const imageFile = dataForm.get("image");

    if (!imageFile || imageFile.size === 0) {
      toast.error("Gambar wajib dipilih");
      return;
    }

    setIsLoading(true);
    try {
      const uploadForm = new FormData();
      uploadForm.append("image", imageFile);

      const { data: upload } = await customApi.post(
        "/product/file-upload",
        uploadForm,
      );

      await customApi.post("/product", {
        name: dataForm.get("name"),
        price: dataForm.get("price"),
        stock: dataForm.get("stock"),
        description: dataForm.get("description"),
        category: dataForm.get("category"),
        image: upload.image,
      });

      toast.success("Berhasil tambah produk");
      navigate("/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tambah Produk</h1>
        <Link to="/products" className="btn btn-ghost btn-sm">
          ← Kembali
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card border border-base-300 bg-base-100 shadow-sm"
      >
        {/* fieldset disabled otomatis mengunci semua input saat loading */}
        <fieldset disabled={isLoading} className="card-body gap-5">
          {/* Upload gambar + preview */}
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
                  Preview gambar
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
                Format gambar, maksimal sesuai batas server
              </p>
            </fieldset>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput name="name" label="Nama Produk" type="text" />
            <FormSelect name="category" label="Kategori" list={categories} />
            <FormInput name="price" label="Harga Produk" type="number" />
            <FormInput name="stock" label="Stok Produk" type="number" />
          </div>

          <FormTextArea name="description" label="Deskripsi Produk" />

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
              {isLoading ? "Menyimpan..." : "Tambah Produk"}
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default CreateProductView;
