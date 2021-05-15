import React, { useState } from "react";
import axios from "axios";
import { useLocation, useHistory, Link } from "react-router-dom";
import logoEmpresa from "../../assets/img/logo-empresa.png";

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

  const [datos, setDatos] = useState({
    usernam: "",
    password: "",
  });
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };
  const history = useHistory();

  const credentials = {
    username: "",
    password: "",
  };

  const autenticarse = async (e) => {
    credentials.username = datos.usernam;
    credentials.password = datos.password;

    try {
      const userAuntenticate = await axios.post(
        "http://api-rest-machine-usuarios.herokuapp.com/api/usuarios/aunteticar",
        credentials
      );

      console.log(userAuntenticate.data);

      if (userAuntenticate.data.autenticado) {
        localStorage.setItem("usuario", JSON.stringify(userAuntenticate.data));
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

    /**  */
  };
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
                        style={{ width: "100%", height: "30%", opacity: "0.5" }}
                        alt="Logo empresa"
                      />
                    </div>
                    <div className="card-description">
                      <Col className="px-md-1" md="12">
                        <FormGroup>
                          <label>Usuario</label>
                          <Input
                            placeholder="Usuario"
                            type="text"
                            name="usernam"
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="12">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
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
                            onClick={autenticarse}
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
                </Card>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default Login;
