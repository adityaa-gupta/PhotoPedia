// components/ProjectList.jsx
import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/firebase/config'; // Adjust the import path to your Firebase config
import ProjectItem from './ProjectItem';
export const revalidate = 60;
 const fetchProjects = async () => {
  const projectsCollection = collection(db, 'projects');
  const projectsSnapshot = await getDocs(projectsCollection);

  const projectsList = projectsSnapshot.docs.map(doc => {
    const projectData = doc.data();
    return {
      id: doc.id,
      ...projectData,
      // Convert Firestore Timestamp to a plain date string
      createdAt: projectData.createdAt?.toDate().toISOString(),
    };
  });

  return projectsList;
};

const ProjectList = async () => {
  const projects = await fetchProjects();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Project List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectItem key={project.id} project={project}  />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
