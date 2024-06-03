import "moment/locale/tr";
import "./../../../scss/admin/form.scss";
import { React, useEffect, useState } from "react";
import { Check, X } from "react-feather";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const readOnlyStyle = {
  background: "white",
  color: "black",
  opacity: 1,
};

const VerticalRoleForm = ({ row, show, handleToggle, onResult }) => {
  const [values, setValues] = useState();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (row) {
      setValues(row);
    }
  }, [row]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (values?.id == null) {
      formData.append("name", values?.name);
    } else {
      formData.append("Id", values?.id);
      formData.append("name", values?.name);
    }
    onResult("B", formData);
  };

  const closeBtn = (
    <button className="close" onClick={handleToggle} type="button">
      &times;
    </button>
  );
  // const options = [{ value: values?.userId, label: values?.user?.name }];
  return (
    <>
      <Modal
        size={"md"}
        className="modal-form"
        isOpen={show}
        backdrop={true}
        toggle={handleToggle}
      >
        <ModalHeader toggle={handleToggle} close={closeBtn}>
          <span>Rol Formu</span>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
              <Form className="pt-10" onSubmit={handleFormSubmit}>
                <Row>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="name">
                      Rol Adı
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={values?.name || ""}
                      style={readOnlyStyle}
                      onChange={handleInput}
                    />
                  </Col>
                </Row>
                <ModalFooter>
                  <Button className="me-1" color="danger">
                    <X></X> Reddet
                  </Button>

                  <Button className="me-1" color="success">
                    <Check></Check> {"Onayla"}
                  </Button>
                </ModalFooter>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};
export default VerticalRoleForm;
