import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Modal from "./Modal";

type FormValues = {
  appname: string;
  description: string;
};

type User = {
  _id: string;
  appname: string;
  appdescription: string;
  knowledgename: string;
  knowledgedescription: string;
  pattern: string;
  embeddings: string;
  metrics: string;
  chuncking: string;
  vectorDb: string;
};

const BasicConfig: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data.data); // Assuming response structure { message: "Users fetched", data: [...] }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

      {/* Modal Buttons */}
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
      <hr />

      {/* User List Table */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">User List</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-400 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">App Name</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Knowledge Name
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Pattern</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Embeddings
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Metrics</th>
                  <th className="border border-gray-400 px-4 py-2">Chunking</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Vector DB
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="text-center">
                      <td className="border border-gray-400 px-4 py-2">
                        {user.appname}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {user.appdescription}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {user.knowledgename}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {user.pattern}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {user.embeddings}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {user.metrics}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {user.chuncking}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {user.vectorDb}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center p-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
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
