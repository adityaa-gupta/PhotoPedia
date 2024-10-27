// components/PhotosList.jsx
import React from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '@/firebase/config';
export const revalidate = 1;
export const dynamic='force-dynamic';
export const dynamicParams = true
const fetchPhotos = async (projectId) => {
  // Set up Firestore query to get photos for the specific projectId
  const photosCollection = collection(db, 'photos');
  const photosQuery = query(photosCollection, where('projectId', '==', projectId));
  const photosSnapshot = await getDocs(photosQuery);

  // Map snapshot data to an array of photo objects
  const photosList = photosSnapshot.docs.map(doc => {
    const photoData = doc.data();
    return {
      id: doc.id,
      title: photoData.title,
      imageUrl: photoData.imageUrl,
    };
  });

  return photosList;
};

const PhotosList = async ({ projectId }) => {
  const photos = await fetchPhotos(projectId);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Photo Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{photo.title}</h3>
            {photo.imageUrl && (
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosList;
