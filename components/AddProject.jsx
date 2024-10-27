
"use client";
import Modal from "@/utils/Modal";
import NewProject from "./NewProject";
import Button from "./Button";

function AddProject() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add Project</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          {/* <CreateBookingForm id={id} cabinID={cabinID} onCloseModal={Modal.close} />
          < */}
          <NewProject onCloseModal={Modal.close} />
        </Modal.Window>
      </Modal>
    </div>
  );
}


// }

export default AddProject;
/**
 *  <Modal.Toggle opens="new-cabin">
        <Button>Add new cabin</Button>
      </Modal.Toggle>
      <Modal.Window name="new-cabin">
        <CreateCabinForm />
      </Modal.Window>
 */