"use client";
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/firebase/config'; // Adjust the path to your Firebase config
import Modal from "@/utils/Modal";
import Button from "./Button";
import NewPhoto from "./NewPhoto";
import useAuthStore from "@/store/useAuthStore";

function AddPhoto({ projectId }) {
  const { user } = useAuthStore();
  const [isOwner, setIsOwner] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) return;
      
      try {
        const projectRef = doc(db, 'projects', projectId);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          const projectData = projectSnap.data();
          setProject(projectData);

          // Check if the current user is the owner of the project
          if (user?.uid === projectData.userId) {
            setIsOwner(true);
          }
        } else {
          console.log("No such project found!");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId, user?.uid]);

  if (!isOwner) return null; // Render nothing if the user is not the owner

  return (
    <div>
      <Modal>
        <Modal.Open opens="photo-form">
          <Button>Add Photo</Button>
        </Modal.Open>
        <Modal.Window name="photo-form">
          <NewPhoto onCloseModal={Modal.close} projectId={projectId} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPhoto;
