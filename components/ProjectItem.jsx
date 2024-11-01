// components/ProjectItem.jsx
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteDoc, doc } from 'firebase/firestore';
import db from '@/firebase/config';
import { toastSuccess, toastError } from '@/utils/toast';
import useAuthStore from '@/store/useAuthStore';

const ProjectItem = ({ project }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const isOwner = user?.uid === project.userId;

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'projects', project.id));
      toastSuccess('Project deleted successfully!');
      router.refresh(); // Refresh the page to see the changes
    } catch (error) {
      console.error("Error deleting project:", error);
      toastError('Failed to delete project. Please try again.');
    }
  };

  if (!isOwner) return null;

  return (
    <div 
      className="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer group"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigating when clicking delete
          handleDelete();
        }}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 focus:outline-none transition"
        aria-label="Delete project"
      >
        &times;
      </button>
      <h3 className="text-2xl font-semibold text-blue-600 mb-2">{project.title}</h3>
      <p className="text-gray-700 mb-2">{project.description}</p>
      <p className="text-gray-500 italic mb-4">Place: {project.place}</p>
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="mt-2 w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out transform group-hover:scale-105" />
      )}
      <p className="text-sm text-gray-500">Created on: {new Date(project.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ProjectItem;
