import React from "react";
import "moment/locale/tr";
import "./../scss/admin/form.scss";
import { Check, X } from "react-feather";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const Confirmation = (showDelete, deleteToggle) => {
  const closeBtn = (
    <button className="close" onClick={deleteToggle} type="button">
      &times;
    </button>
  );

  return (
    <div>
      <Modal
        size={"lg"}
        className="modal-form"
        isOpen={showDelete}
        backdrop={true}
        toggle={deleteToggle}
        centered
      >
        <ModalHeader toggle={deleteToggle} close={closeBtn}>
          <span>Delete Category</span>
        </ModalHeader>

        <ModalBody>
          <Label>Silmek istediğinizden emin misiniz?</Label>

          <ModalFooter>
            <Button className="me-1" color="danger">
              <X></X> Reddet
            </Button>

            <Button className="me-1" color="success">
              <Check></Check> {"Onayla"}
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Confirmation;
