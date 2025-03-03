import { useRouter } from "next/router";

const Security: React.FC = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
const handleSubmit = async () => {
  const basicConfig = JSON.parse(localStorage.getItem("basicConfig") || "{}");
  const ragConfigArray = JSON.parse(localStorage.getItem("ragConfig") || "[]");

  if (
    !basicConfig.appname ||
    !basicConfig.description ||
    ragConfigArray.length === 0
  ) {
    console.error("Invalid or missing data in localStorage");
    return;
  }

  const ragConfig = ragConfigArray[0];

  const userData = {
    appname: basicConfig.appname,
    appdescription: basicConfig.description,
    knowledgename: ragConfig.knowledgebasename,
    knowledgedescription: ragConfig.ragdescription,
    pattern: ragConfig.pattern,
    embeddings: ragConfig.embeddings,
    metrics: ragConfig.metrics,
    chuncking: ragConfig.chunking,
    vectorDb: ragConfig.vectordb,
  };

  console.log("Posting Data:", userData); // Debugging Log

 const fetchUser = async () => {
   try {
     const res = await fetch(`${BASE_URL}/api/users`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });

     if (!res.ok) {
       throw new Error(`HTTP error! Status: ${res.status}`);
     }

     const data = await res.json();
     console.log("Fetched Users:", data);
     return data;
   } catch (error) {
     console.error("Error fetching users:", error);
   }
 };

  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("User saved:", result);

    router.push("/basic-config");
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
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
            className="bg-[#3C7069] px-4 py-2 rounded text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
