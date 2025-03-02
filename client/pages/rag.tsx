import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

type FormValues = {
  knowledgebasename: string;
  ragdescription: string;
  pattern: string;
  embeddings: string;
  metrics: string;
  chunking: string;
  vectordb: string;
};

const RAG: React.FC = () => {
  const router = useRouter();
  const [configurations, setConfigurations] = useState<FormValues[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const updatedConfigurations = [...configurations, data];
    setConfigurations(updatedConfigurations);
    localStorage.setItem("ragConfig", JSON.stringify(updatedConfigurations)); // Store data
    reset();
  };
  return (
    <div className="p-4 border border-green-800 rounded-lg ">
      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Header */}
        <div className="bg-[#3C7069] text-white p-3 rounded-t-lg">
          <h1 className="text-lg font-bold">RAG Configuration</h1>
        </div>

        {/* Knowledge Base Name */}
        <div className="flex flex-col">
          <label className="font-medium">Knowledge Base Name</label>
          <input
            type="text"
            className="border p-2 rounded"
            {...register("knowledgebasename", {
              required: "Knowledge base name is required",
            })}
          />
          {errors.knowledgebasename && (
            <span className="text-red-500 text-sm">
              {errors.knowledgebasename.message}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium">Description</label>
          <input
            type="text"
            className="border p-2 rounded"
            {...register("ragdescription", {
              required: "Description is required",
            })}
          />
          {errors.ragdescription && (
            <span className="text-red-500 text-sm">
              {errors.ragdescription.message}
            </span>
          )}
        </div>

        {/* Grid Layout for Select Options */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Pattern",
              name: "pattern",
              options: ["Pattern 1", "Pattern 2"],
            },
            {
              label: "Embeddings",
              name: "embeddings",
              options: ["Embedding 1", "Embedding 2"],
            },
            {
              label: "Metrics",
              name: "metrics",
              options: ["Metric 1", "Metric 2"],
            },
            {
              label: "Chunking",
              name: "chunking",
              options: ["Chunking 1", "Chunking 2"],
            },
          ].map(({ label, name, options }) => (
            <div key={name} className="flex flex-col">
              <label className="font-medium">{label}</label>
              <select
                className="border p-2 rounded"
                {...register(name as keyof FormValues, {
                  required: `${label} is required`,
                })}
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option
                    key={option}
                    value={option.toLowerCase().replace(" ", "")}
                  >
                    {option}
                  </option>
                ))}
              </select>
              {errors[name as keyof FormValues] && (
                <span className="text-red-500 text-sm">
                  {(errors[name as keyof FormValues] as any)?.message}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Vector DB */}
        <div className="flex flex-col">
          <label className="font-medium">Vector DB</label>
          <input
            type="text"
            className="border p-2 rounded"
            {...register("vectordb", { required: "Vector DB is required" })}
          />
          {errors.vectordb && (
            <span className="text-red-500 text-sm">
              {errors.vectordb.message}
            </span>
          )}
        </div>

        {/* Add Configuration Button */}
        <button
          type="submit"
          className={`px-4 py-2 rounded transition ${
            isValid
              ? "bg-[#3C7069] text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!isValid}
        >
          Add Configuration
        </button>
      </form>

      {/* Configuration Table */}
      {configurations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Added Configurations:</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Knowledge Base
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Pattern</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Embeddings
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Metrics</th>
                  <th className="border border-gray-300 px-4 py-2">Chunking</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Vector DB
                  </th>
                </tr>
              </thead>
              <tbody>
                {configurations.map((config, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.knowledgebasename}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.ragdescription}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.pattern}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.embeddings}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.metrics}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.chunking}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {config.vectordb}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={() => router.push("/basic-config")}
        >
          Previous
        </button>

        <button
          type="button"
          className={`px-4 py-2 rounded transition ${
            configurations.length > 0
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          onClick={() => router.push("/workflow")}
          disabled={configurations.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RAG;
