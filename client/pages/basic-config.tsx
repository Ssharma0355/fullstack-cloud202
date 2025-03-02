import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "./Modal";

type FormValues = {
  appname: string;
  description: string;
};

const BasicConfig: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();


  const [openModal, setOpenModal] = useState<string | null>(null);

 const onSubmit: SubmitHandler<FormValues> = (data) => {
   console.log("Form Submitted:", data);
   localStorage.setItem("basicConfig", JSON.stringify(data)); // Store data
   router.push("/rag");
 };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border border-black rounded-lg border-green-800"
    >
      {/* Header */}
      <div className="bg-[#3C7069] text-white p-3 rounded-t-lg">
        <h1 className="text-lg font-bold">Basic Configuration</h1>
      </div>

      {/* App Name Field */}
      <div className="flex flex-col">
        <label htmlFor="appname" className="font-medium">
          App Name
        </label>
        <input
          id="appname"
          type="text"
          {...register("appname", { required: "App Name is required" })}
          className="border p-2 rounded"
        />
        {errors.appname && (
          <span className="text-red-500">{errors.appname.message}</span>
        )}
      </div>

      {/* Description Field */}
      <div className="flex flex-col">
        <label htmlFor="description" className="font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="border p-2 rounded"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div></div>
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setOpenModal("query")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Query Modal
        </button>
        <button
          type="button"
          onClick={() => setOpenModal("warning")}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Open Warning Modal
        </button>
        <button
          type="button"
          onClick={() => setOpenModal("success")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Open Success Modal
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
      >
        Next
      </button>
      {openModal === "query" && (
        <Modal
          isOpen={true}
          onClose={() => setOpenModal(null)}
          title="Query Modal"
        >
          <p>Are you sure you want to proceed?</p>
        </Modal>
      )}
      {openModal === "warning" && (
        <Modal
          isOpen={true}
          onClose={() => setOpenModal(null)}
          title="Warning Modal"
        >
          <p>Please review your inputs carefully.</p>
        </Modal>
      )}
      {openModal === "success" && (
        <Modal
          isOpen={true}
          onClose={() => setOpenModal(null)}
          title="Success Modal"
        >
          <p>Form submitted successfully!</p>
        </Modal>
      )}
    </form>
  );
};

export default BasicConfig;
