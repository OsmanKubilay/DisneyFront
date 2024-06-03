import "moment/locale/tr";
import "./../../../scss/admin/form.scss";
import { React, useEffect, useState } from "react";
import { Check, X, Upload } from "react-feather";
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
import defaultImg from "./../../../assets/img/imageEmpty.png";

const readOnlyStyle = {
  background: "white",
  color: "black",
  opacity: 1,
};

const VerticalCategoryForm = ({ row, show, handleToggle, onResult }) => {
  const [values, setValues] = useState();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (row.imageSrc == null) row.imageSrc = defaultImg;
    if (row) {
      setValues(row);
    }
  }, [row]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (values?.id == null) {
      formData.append("name", values?.name);
      formData.append("description", values?.description);
      formData.append("userId", values?.userId);
      formData.append("imageName", values?.imageName);
      formData.append("imageFile", values?.imageFile);
    } else {
      formData.append("Id", values?.id);
      formData.append("name", values?.name);
      formData.append("description", values?.description);
      formData.append("userId", values?.userId);
      formData.append("imageName", values?.imageName);
      formData.append("imageFile", values?.imageFile);
    }
    onResult("B", formData);
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      console.log(imageFile);
      reader.onload = (x) => {
        console.log(imageFile);

        setValues({
          ...values,
          imageFile: imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      console.log(1);
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImg,
      });
    }
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
        size={"lg"}
        className="modal-form"
        isOpen={show}
        backdrop={true}
        toggle={handleToggle}
      >
        <ModalHeader toggle={handleToggle} close={closeBtn}>
          <span>Kategory Form</span>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
              <Form className="pt-10" onSubmit={handleFormSubmit}>
                <Row>
                  <Col sm="6">
                    <Col sm="12" className="mb-1">
                      <Label className="form-label" for="name">
                        Category name
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

                    <Col sm="12" className="mb-1">
                      <Label className="form-label" for="description">
                        Description
                      </Label>
                      <Input
                        id="description"
                        name="description"
                        required
                        value={values?.description || ""}
                        style={readOnlyStyle}
                        onChange={handleInput}
                      />
                    </Col>

                    <Col sm="12" className="mb-1">
                      <Label className="form-label" for="userId">
                        User Id
                      </Label>
                      <Input
                        name="userId"
                        id="userId"
                        required
                        value={values?.userId || ""}
                        onChange={handleInput}
                      />
                      {/* <Select options={options}></Select> */}
                    </Col>
                  </Col>
                  <Col sm="6">
                    <Col sm="12" className="mb-1">
                      <div className="form-label-img">
                        <img
                          className="form-img"
                          alt="asd"
                          src={values?.imageSrc}
                        />
                      </div>
                      <Input
                        accept="image/*"
                        style={{ visibility: "hidden" }}
                        id="filePicker"
                        required
                        name="imageSrc"
                        type="file"
                        onChange={showPreview}
                      />
                      <Label
                        sm="12"
                        className="form-label-label "
                        htmlFor="filePicker"
                        for="file"
                      >
                        Resim Yükle <Upload className="mb-1 ml-2"></Upload>
                      </Label>
                    </Col>
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
export default VerticalCategoryForm;
