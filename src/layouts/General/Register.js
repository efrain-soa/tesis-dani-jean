import React, { useState } from "react";
import axios from "axios";
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

  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    usernam: "",
    password: "",
    email: "",
  });
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };
  const history = useHistory();

  const newuser = {
    nombre: "",
    apellidos: "",
    username: "",
    hashPassword: "",
    email: "",
    rol: "CLIENTE",
  };

  const autenticarse = async () => {
    newuser.nombre = datos.nombre;
    newuser.apellidos = datos.apellidos;
    newuser.username = datos.usernam;
    newuser.email = datos.email;
    newuser.hashPassword = datos.password;

    console.log(newuser);

    try {
      const userCreate = await axios.post(
        "http://api-rest-machine-usuarios.herokuapp.com/api/usuarios/crear",
        newuser
      );

      console.log(userCreate.data);

      if (userCreate.data.status == "201") {
        localStorage.setItem(
          "usuario",
          JSON.stringify(userCreate.data.usuario)
        );
        history.push({
          pathname: "/admin/dashboard",
        });
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
              paddingTop: "4%",
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

                      <h1 className="title">Registrate</h1>

                      <p className="description">
                        Pronto podrás saber lo que necesita tu auto :)
                      </p>
                    </div>
                    <div className="card-description">
                      <Col className="px-md-1" md="12">
                        <FormGroup>
                          <label>Nombres</label>
                          <Input
                            placeholder="Nombres"
                            type="text"
                            name="nombre"
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="12">
                        <FormGroup>
                          <label>Apellidos</label>
                          <Input
                            placeholder="Apellidos"
                            type="text"
                            name="apellidos"
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="12">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            placeholder="Username"
                            type="text"
                            name="usernam"
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="12">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            placeholder="Emal"
                            type="mail"
                            name="email"
                            onChange={handleInputChange}
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
                            onClick={autenticarse}
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
