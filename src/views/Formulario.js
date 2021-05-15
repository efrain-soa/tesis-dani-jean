import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import sintomas from "./Sintomas";
import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Container,
} from "reactstrap";

function Formulario() {
  const [modal, setModal] = useState(false);

  const [user, setUser] = useState({});
  React.useEffect(() => {
    const response = JSON.parse(localStorage.getItem("usuario"));

    setUser(response.usuario);

    if (response === null) {
      history.push({
        pathname: "/login",
      });
    }
  }, []);

  const toggle = () => {
    setModal(!modal);

    setTimeout(() => {
      setgeneraRecomendacion(false);
    }, 1000);
  };

  const [datos, setDatos] = useState({
    placa: "",
    modelo: "",
    marca: "",
    direccion: "",
    telefono: "",
    descripcion: "",
  });
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const [generaRecomendacion, setgeneraRecomendacion] = useState(true);

  const history = useHistory();
  const [array, setArray] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const irRecomendacion = () => {
    history.push({
      pathname: "/recomendacion",
      array: array,
      usuario: user,
      datos: datos,
    });
  };

  function handleChange(obj) {
    if (obj.target.state) {
      array[parseInt(obj.target.value) - 1] = 1;
    } else {
      array[parseInt(obj.target.value) - 1] = 0;
    }
    console.log(array);
  }

  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h4 className="title">
                  Ingresa una breve información de tu auto :)
                </h4>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Nombre Cliente</label>
                        <Input
                          defaultValue={user.nombre}
                          disabled
                          type="text"
                          name="nombre"
                          style={{ color: "white" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Marca</label>
                        <Input
                          placeholder="Ingrese Marca del Vehiculo"
                          type="text"
                          name="marca"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Placa</label>
                        <Input
                          placeholder="Ingrese su número de placa"
                          type="text"
                          name="placa"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Modelo</label>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          name="modelo"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>Dirección</label>
                        <Input
                          placeholder="Ingrese dirección de domicilio"
                          type="text"
                          name="direccion"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Número Telefónico</label>
                        <Input
                          placeholder="Ingrese número de contacto"
                          type="text"
                          name="telefono"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Breve descripción de su engreido</label>
                        <Input
                          cols="80"
                          placeholder="Cuéntanos acerca de tu auto ..."
                          rows="4"
                          type="textarea"
                          name="descripcion"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" onClick={toggle}>
                  Registrar Síntomas
                </Button>
                <Button
                  className="btn-fill"
                  color="success"
                  disabled={generaRecomendacion}
                  onClick={irRecomendacion}
                >
                  Generar Recomendación
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Modal
          isOpen={modal}
          modalTransition={{ timeout: 300 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={toggle}
          size="xl"
          style={{
            position: "absolute",
            right: "0",
            bottom: "2%",
            left: "5%",
          }}
        >
          <ModalHeader toggle={toggle}>
            Seleccione los síntomas que presenta su vehículo:
          </ModalHeader>
          <ModalBody>
            <div className="content">
              <Row>
                {sintomas.map((obj, key) => (
                  <Col md="2" style={{ paddingTop: "3%" }}>
                    <img
                      src={obj.img}
                      style={{ width: "100%", height: "60%" }}
                      alt="Logo"
                    />
                    <Input
                      key={key}
                      type="checkbox"
                      style={{ height: "25px", width: "25px", left: "20%" }}
                      onChange={(e) => {
                        handleChange({
                          target: {
                            name: obj.sintoma,
                            value: obj.codigo,
                            state: e.target.checked,
                          },
                        });
                      }}
                    />
                    {obj.sintoma}
                  </Col>
                ))}
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <Container>
              <Row>
                <Col md="6">
                  <Button
                    className="btn-fill"
                    color="primary"
                    onClick={toggle}
                    style={{ width: "100%" }}
                  >
                    Guardar Cambios
                  </Button>
                </Col>
                <Col md="6">
                  <Button
                    className="btn-fill"
                    color="secondary"
                    onClick={toggle}
                    style={{ width: "100%" }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Formulario;
