import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const ERROR_CONTENT = {
  404: {
    title: "Halaman Tidak Ditemukan",
    description:
      "Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.",
    retry: false,
  },
  500: {
    title: "Server Bermasalah",
    description:
      "Maaf, terjadi kesalahan di server kami. Silakan coba lagi beberapa saat lagi.",
    retry: true,
  },
};

const DEFAULT_CONTENT = {
  title: "Terjadi Kesalahan",
  description: "Ada yang tidak beres. Silakan coba lagi nanti.",
  retry: true,
};

const ErrorView = () => {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : null;
  const { title, description, retry } =
    ERROR_CONTENT[status] ?? DEFAULT_CONTENT;

  return (
    <main className="grid min-h-screen place-items-center bg-base-200 px-6 py-12">
      <div className="text-center">
        {status && (
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Error {status}
          </p>
        )}
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-7 text-base-content/70">
          {description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {retry && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Coba Lagi
            </button>
          )}
          <Link
            to="/"
            className={retry ? "btn btn-outline" : "btn btn-primary"}
          >
            Kembali ke Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-ghost"
          >
            Halaman sebelumnya
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorView;
