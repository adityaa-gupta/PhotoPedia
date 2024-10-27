"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import db, { storage } from "@/firebase/config";
import { toastError, toastSuccess } from "@/utils/toast";
import useAuth from "@/hooks/useAuth";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const NewProject = ({onCloseModal}) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const imageFile = watch("image"); // Watch the image input field
  const {user}=useAuthStore();
  console.log(user,16 );
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
    <div className="flex items-center justify-center h-[70vh] overflow-y-scroll  ">
      <div className="   bg-yellow-600 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold my-10 text-gray-700 text-center">Create New Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-600 mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-600 mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-600 mb-1">Place</label>
            <input
              type="text"
              {...register("place", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-600 mb-1">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold text-gray-600 mb-1">Upload Image</label>
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 font-semibold text-white rounded ${uploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
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
