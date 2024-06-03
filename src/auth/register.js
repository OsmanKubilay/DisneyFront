import "moment/locale/tr";
import { React, useState } from "react";
import { Check, X } from "react-feather";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
const readOnlyStyle = {
    background: "white",
    color: "black",
    opacity: 1,
};
const endPointRegister = "https://localhost:7112/api/Auth/register";
const Register = () => {
    const [values, setValues] = useState();
    const [navigate, setNavigate] = useState(false);
    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("username", values?.username);
        formData.append("role", values?.role);
        formData.append("email", values?.email);
        formData.append("password", values?.password);

        axios.post(endPointRegister,
            {
                username: values?.username,
                role: values?.role,
                email: values?.email,
                password: values?.password
            }, {
            headers: {
                contentType: 'application/json'
            },
        }).then((result) => {
            console.log(result);
            setNavigate(true);
        }).catch();


    };
    if (navigate) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <Row>
            <Col md="12">
                <Form className="pt-10" onSubmit={handleFormSubmit}>
                    <Row>
                        <Col sm="6">
                            <Row sm="12" className="mb-1">
                                <Col sm="6" className="mb-1">
                                    <Label className="form-label" for="role">
                                        Role
                                    </Label>
                                    <Input
                                        id="role"
                                        name="role"
                                        required
                                        value={values?.role || ""}
                                        style={readOnlyStyle}
                                        onChange={handleInput}
                                    />
                                </Col>
                                <Col sm="6" className="mb-1">
                                    <Label className="form-label" for="username">
                                        Kullanıcı Adı
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
    );
};
export default Register;