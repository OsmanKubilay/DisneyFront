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

const VerticalUserForm = ({ row, show, handleToggle, onResult }) => {
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
      formData.append("surname", values?.surName);
      formData.append("phoneNumber", values?.phoneNumber);
      formData.append("email", values?.email);
      formData.append("imageName", values?.imageName);
      formData.append("imageFile", values?.imageFile);
      formData.append("password", values?.password);
    } else {
      formData.append("Id", values?.id);
      formData.append("name", values?.name);
      formData.append("surname", values?.surName);
      formData.append("phoneNumber", values?.phoneNumber);
      formData.append("email", values?.email);
      formData.append("password", values?.password);
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
          <span>Kullanıcı Formu</span>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
              <Form className="pt-10" onSubmit={handleFormSubmit}>
                <Row>
                  <Col sm="6">
                    <Row sm="12" className="mb-1">
                      <Col sm="6" className="mb-1">
                        <Label className="form-label" for="name">
                          Kullanıcı Adı
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

                      <Col sm="6" className="mb-1">
                        <Label className="form-label" for="surName">
                          Kullanıcı Soyadı
                        </Label>
                        <Input
                          id="surName"
                          name="surName"
                          required
                          value={values?.surName || ""}
                          style={readOnlyStyle}
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
                    <Row sm="12" className="mb-1">
                      <Col sm="12" className="mb-1">
                        <Label className="form-label" for="phoneNumber">
                          Kullanıcı Telefon Numarası
                        </Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          required
                          value={values?.phoneNumber || ""}
                          style={readOnlyStyle}
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
                    <Row sm="12" className="mb-1">
                      <Col sm="12" className="mb-1">
                        <Label className="form-label" for="email">
                          Kullanıcı Mail Adresi
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          required
                          value={values?.email || ""}
                          style={readOnlyStyle}
                          onChange={handleInput}
                        />
                      </Col>
                      <Col sm="12" className="mb-1">
                        <Label className="form-label" for="password">
                          Kullanıcı Şifresi
                        </Label>
                        <Input
                          id="password"
                          name="password"
                          required
                          value={values?.password || ""}
                          style={readOnlyStyle}
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
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
export default VerticalUserForm;
