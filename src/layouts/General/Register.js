import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

const Register = () => {
  const location = useLocation();

  //console.log(location.state.test);

  const history = useHistory();

  const newuser = {
    nombre: "",
    apellidos: "",
    username: "",
    hashPassword: "",
    email: "",
    rol: "CLIENTE",
  };

  // validación y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      usernam: "",
      password: "",
      nombres: "",
      apellidos: "",
      email: "",
    },
    validationSchema: Yup.object({
      usernam: Yup.string()
        .min(5, "Debe ingresar mínimo 5 caracteres")
        .max(15, "Debe ingresar máximo 15 caracteres")
        .required("Debe ingresar un usuario"),
      password: Yup.string()
        .min(8, "Debe ingresar mínimo 8 caracteres")
        .required("Debe ingresar un password"),
      nombres: Yup.string()
        .min(5, "Debe ingresar mínimo 5 caracteres")
        .max(20, "Debe ingresar máximo 20 caracteres")
        .required("Debe ingresar un nombre"),
      apellidos: Yup.string()
        .min(5, "Debe ingresar mínimo 5 caracteres")
        .max(20, "Debe ingresar máximo 20 caracteres")
        .required("Debe ingresar sus apellidos"),
      email: Yup.string()
        .email("Ingrese un formato email válido")
        .required("Debe ingresar un email"),
    }),
    onSubmit: async (userform) => {
      newuser.nombre = userform.nombres;
      newuser.apellidos = userform.apellidos;
      newuser.username = userform.usernam;
      newuser.email = userform.email;
      newuser.hashPassword = userform.password;

      console.log(newuser);

      try {
        const userCreate = await axios.post(
          "http://api-rest-machine-usuarios.herokuapp.com/api/usuarios/crear",
          newuser
        );

        console.log(userCreate.data);

        if (userCreate.data.status == "201") {
          localStorage.setItem("usuario", JSON.stringify(userCreate.data));
          history.push({
            pathname: "/cliente/formulario",
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  });

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <Container
            className="themed-container"
            style={{
              paddingTop: "4%",
            }}
            fluid="md"
          >
            <Row>
              <Col md="12">
                <Card className="card-user">
                  <form onSubmit={formik.handleSubmit}>
                    <CardBody>
                      <CardText />
                      <div className="author">
                        <div className="block block-one" />
                        <div className="block block-two" />
                        <div className="block block-three" />
                        <div className="block block-four" />

                        <h1 className="title">Registrate</h1>

                        <p className="description">
                          Pronto podrás saber lo que necesita tu auto :)
                        </p>
                      </div>
                      <div className="card-description">
                        <Col className="px-md-1" md="12">
                          <label>Nombres</label>
                          <Input
                            placeholder="Nombres"
                            type="text"
                            id="nombres"
                            name="nombres"
                            value={formik.values.nombres}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.nombres && formik.errors.nombres ? (
                            <div role="alert">
                              <p className="text-danger">
                                {formik.errors.nombres}{" "}
                              </p>
                            </div>
                          ) : null}
                        </Col>
                        <Col className="px-md-1" md="12">
                          <label>Apellidos</label>
                          <Input
                            placeholder="Apellidos"
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            value={formik.values.apellidos}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.apellidos &&
                          formik.errors.apellidos ? (
                            <div role="alert">
                              <p className="text-danger">
                                {formik.errors.apellidos}{" "}
                              </p>
                            </div>
                          ) : null}
                        </Col>
                        <Col className="px-md-1" md="12">
                          <label>Username</label>
                          <Input
                            placeholder="Username"
                            type="text"
                            id="usernam"
                            name="usernam"
                            value={formik.values.usernam}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.usernam && formik.errors.usernam ? (
                            <div role="alert">
                              <p className="text-danger">
                                {formik.errors.usernam}{" "}
                              </p>
                            </div>
                          ) : null}
                        </Col>
                        <Col className="px-md-1" md="12">
                          <label>Email</label>
                          <Input
                            placeholder="Emal"
                            type="mail"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div role="alert">
                              <p className="text-danger">
                                {formik.errors.email}{" "}
                              </p>
                            </div>
                          ) : null}
                        </Col>
                        <Col className="px-md-1" md="12">
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <div role="alert">
                              <p className="text-danger">
                                {formik.errors.password}{" "}
                              </p>
                            </div>
                          ) : null}
                        </Col>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <div className="button-container">
                        <Row>
                          <Col md="12">
                            <Button
                              size="lg"
                              block
                              className="btn-fill"
                              color="primary"
                              type="submit"
                            >
                              Regístrate
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <Button
                              size="lg"
                              block
                              className="btn-fill"
                              outline
                              color="secondary"
                            >
                              Atrás
                            </Button>
                          </Col>
                        </Row>
                        <Button className="btn-icon btn-round" color="facebook">
                          <i className="fab fa-facebook" />
                        </Button>
                        <Button className="btn-icon btn-round" color="twitter">
                          <i className="fab fa-twitter" />
                        </Button>
                        <Button className="btn-icon btn-round" color="google">
                          <i className="fab fa-google-plus" />
                        </Button>
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default Register;
