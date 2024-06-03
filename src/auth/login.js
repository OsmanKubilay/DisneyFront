import "moment/locale/tr";
import React, { useEffect, useState } from "react";
import { Check, X } from "react-feather";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import axios from "axios";
const readOnlyStyle = {
  background: "white",
  color: "black",
  opacity: 1,
};
const endPointLogin = "https://localhost:7112/api/Auth/Login";
const endPoindLogOut = "https://localhost:7112/api/Auth/logout";
const Login = () => {
  const [values, setValues] = useState();
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  const logout = () => {
    axios
      .post(endPoindLogOut, { withCredentials: "include" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    logout();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", values?.username);
    formData.append("password", values?.password);

    axios.post(endPointLogin, { username: values?.username, password: values?.password }, { withCredentials: "include" }, {
      headers: {
        contentType: 'application/json'
      },
    }).then((result) => {
      console.log(result);
      if (result.data.message === "success") {
        window.location.href = "/admin/MainPage"
      }
    }).catch();

  };

  return (
    <div>
      <Row
        style={{
          width: "100%",
          marginTop: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col md="6">
          <h1>Giriş</h1>
          <Form className="pt-10" onSubmit={handleFormSubmit}>
            <Row>
              <Col sm="12">
                <Row sm="12" className="mb-1">
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="username">
                      Kullanıcı Mail Adresi
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      required
                      value={values?.username || ""}
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
                      type="password"
                      autoComplete="off"
                      required
                      value={values?.password || ""}
                      style={readOnlyStyle}
                      onChange={handleInput}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Button className="me-1" color="danger">
              <X></X> Reddet
            </Button>
            <Button className="me-1" color="success">
              <Check></Check> {"Onayla"}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
