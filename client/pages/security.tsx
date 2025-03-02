import { useRouter } from "next/router";
const Security: React.FC = () => {
    const router = useRouter();


    const handleSubmit = () => {
    const basicConfig = JSON.parse(localStorage.getItem("basicConfig") || "{}");
    const ragConfig = JSON.parse(localStorage.getItem("ragConfig") || "[]");

    console.log("Basic Config:", basicConfig);
    console.log("RAG Config:", ragConfig);

    router.push("/security");
  };
  return (
    <div className="p-4 border border-green-800 rounded-lg ">
      {/* Form Section */}
      <form className="space-y-4">
        {/* Header */}
        <div className="bg-[#3C7069] text-white p-3 rounded-t-lg">
          <h1 className="text-lg font-bold">Security</h1>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Security Name</label>
          <input type="text" className="border p-2 rounded" />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={() => router.push("/rag")}
          >
            Previous
          </button>

          <button
            type="button"
            className={"bg-[#3C7069] px-4 py-2 rounded text-white "}
            onClick={handleSubmit}
            //API integration needed
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
