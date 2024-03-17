import clsx from "clsx";
import { useAdminActions } from "./hooks/useAdminActions";

const AdminActionList = () => {
  const { saveLoading, saveAdminData } = useAdminActions();

  return (
    <>
      {saveLoading && (
        <div className={clsx("fixed z-50 inset-0 bg-white/40 flex items-center justify-center")}>
          <p className={clsx("animate-pulse font-bold")}>Loading...</p>
        </div>
      )}
      <div className={clsx("flex gap-2")}>
        <button
          className={clsx("text-white font-semibold py-1 px-4 rounded-lg bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed")}
          disabled={saveLoading}
          onClick={saveAdminData}>
          Save
        </button>
        <a
          className={clsx("text-white block font-semibold py-1 px-4 rounded-lg bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed")}
          href="/"
          target="_blank"
        >
          View
        </a>
      </div>
    </>
  );
}

export default AdminActionList;
