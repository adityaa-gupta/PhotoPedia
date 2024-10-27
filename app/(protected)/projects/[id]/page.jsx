// app/project/[id]/page.jsx
import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/firebase/config';
import AddPhoto from '@/components/AddPhoto';
import PhotosList from '@/components/PhotosList';
export const dynamicParams = true
const ProjectPage = async ({ params }) => {
  // Await params to properly handle async params access
  const { id } = await params;

  // Fetch project data from Firestore
  const projectDoc = await getDoc(doc(db, 'projects', id));
  const projectData = projectDoc.exists() ? { id: projectDoc.id, ...projectDoc.data() } : null;

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <AddPhoto projectId={id} />
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{projectData.title}</h1>
      <p className="text-gray -700 mb-4">{projectData.description}</p>
      <p className="text-gray-500 italic mb-4">Place: {projectData.place}</p>
      {projectData.imageUrl && (
        <img
          src={projectData.imageUrl}
          alt={projectData.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      )}
      <PhotosList projectId={id} />
    </div>
  );
};

export default ProjectPage;
