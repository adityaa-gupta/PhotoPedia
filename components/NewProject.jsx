"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import db, { storage } from "@/firebase/config";
import { toastError, toastSuccess } from "@/utils/toast";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const NewProject = ({ onCloseModal }) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const imageFile = watch("image"); // Watch the image input field
  const { user } = useAuthStore();

  const onSubmit = async (data) => {
    if (!imageFile || !imageFile[0]) {
      toastError("Please select an image to upload");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload the image to Firebase Storage
      const imageRef = ref(storage, `images/${imageFile[0].name}`);
      await uploadBytes(imageRef, imageFile[0]);

      // 2. Get the URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // 3. Save the form data along with the image URL in Firestore
      await addDoc(collection(db, "projects"), {
        name: data.name,
        title: data.title,
        place: data.place,
        description: data.description,
        imageUrl: imageUrl,
        createdAt: new Date(),
        userId: user.uid,
      });

      toastSuccess("Project successfully added!");
      reset(); // Reset the form after submission
      onCloseModal(); // Close the modal
      router.refresh(); // Refresh the page to see the new project
    } catch (error) {
      console.error("Error uploading the project:", error);
      toastError("Error uploading the project. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div className="flex items-center justify-center h-[80vh] overflow-y-scroll">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create New Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* <div>
            <label className="block font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div> */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Place</label>
            <input
              type="text"
              {...register("place", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 mt-4 font-semibold text-white rounded-lg transition duration-300 ${uploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
