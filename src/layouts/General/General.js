import React, { useState } from "react";
import axios from "axios";
import { useLocation, useHistory, Link } from "react-router-dom";
import logoEmpresa from "../../assets/img/logo-empresa.png";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

const Login = () => {
  const location = useLocation();

  //console.log(location.state.test);

  const history = useHistory();

  const credentials = {
    usernam: "",
    password: "",
  };

  // validación y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      usernam: "",
      password: "",
    },
    validationSchema: Yup.object({
      usernam: Yup.string().required("Debe ingresar un usuario"),
      password: Yup.string().required("Debe ingresar un password"),
    }),
    onSubmit: async (userform) => {
      credentials.username = userform.usernam;
      credentials.password = userform.password;

      try {
        const userAuntenticate = await axios.post(
          "https://api-rest-machine-usuarios.herokuapp.com/api/usuarios/aunteticar",
          credentials
        );

        console.log(userAuntenticate.data);

        if (userAuntenticate.data.autenticado) {
          localStorage.setItem(
            "usuario",
            JSON.stringify(userAuntenticate.data)
          );
          if (userAuntenticate.data.usuario.rol == "ADMIN") {
            history.push({
              pathname: "/admin/dashboard",
            });
          } else if (userAuntenticate.data.usuario.rol == "CLIENTE") {
            history.push({
              pathname: "/cliente/formulario",
            });
          }
        } else {
          alert(userAuntenticate.data.mensaje);
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
              paddingTop: "10%",
              paddingLeft: "20%",
              paddingRight: "20%",
            }}
            fluid="md"
          >
            <Row>
              <form onSubmit={formik.handleSubmit}>
                <Col md="12">
                  <Card className="card-user">
                    <CardBody>
                      <CardText />
                      <div className="author">
                        <div className="block block-one" />
                        <div className="block block-two" />
                        <div className="block block-three" />
                        <div className="block block-four" />
                        <img
                          src={logoEmpresa}
                          style={{
                            width: "100%",
                            height: "30%",
                            opacity: "0.5",
                          }}
                          alt="Logo empresa"
                        />
                      </div>
                      <div className="card-description">
                        <Col className="px-md-1" md="12">
                          <label>Usuario</label>
                          <Input
                            placeholder="Usuario"
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
                              Iniciar Sesion
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <Link to="/register/user">
                              <Button
                                size="lg"
                                block
                                className="btn-fill"
                                outline
                                color="secondary"
                              >
                                Registrate
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </form>
            </Row>
          </Container>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default Login;
