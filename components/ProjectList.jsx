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
    <div className="p-8 bg-black min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-8 text-white text-center">Project List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
            <ProjectItem project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
