import React, { useEffect, useState } from "react";

import axios from "axios";

import cambioFiltroAire from "../assets/img/cambio de filtro de aire.png";
import cambioPastillasFreno from "../assets/img/Cambio de pastillas de freno.png";
import mantenimientoGeneral from "../assets/img/Mantenimiento General.png";
import cambioAceite from "../assets/img/Cambio de aceite.png";

import ExclusivoPastillasFreno from "../views/TratamientoExclusivo/ExclusivoPastillasFreno";
import ExclusivoMantenimientoGeneral from "../views/TratamientoExclusivo/ExclusivoMantenimientoGeneral";
import ExclusivoCambioFiltroAire from "../views/TratamientoExclusivo/ExclusivoCambioFiltroAire";
import ExclusivoCambioAceite from "../views/TratamientoExclusivo/ExclusivoCambioAceite";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  ModalFooter,
  Col,
  Row,
  Card,
  Button,
  CardBody,
  CardImg,
  Badge,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
} from "reactstrap";

function Citas() {
  const [result, setResult] = useState({});

  useEffect(() => {
    obtenerCitasCliete();
  }, []);

  async function obtenerCitasCliete() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario.usuario);
    try {
      const recomendacionResponse = await axios.get(
        "https://api-rest-machinne-citas.herokuapp.com/api/citas/" +
          usuario.usuario.id +
          "/true"
      );

      setResult(recomendacionResponse.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const [cincuentaMil, setCincuentaMil] = useState(0);
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [recomendaciong, setRecomendaciong] = useState("");
  const [modal, setModal] = useState(false);

  function toggle(lista_sintomas, recomendacion, tipoVehiculo) {
    lista_sintomas.map((x, y) => {
      if (x.sintoma == "mayor a 50,000 kilometros") {
        setCincuentaMil(1);
      }
    });
    setRecomendaciong(recomendacion);
    setTipoVehiculo(tipoVehiculo);
    setModal(!modal);
  }

  function toggleClouse() {
    console.log(recomendaciong + tipoVehiculo + cincuentaMil);
    setModal(!modal);
  }

  return Object.entries(result).length === 0 ? null : (
    <div className="content">
      <h4>Estimado cliente, se muestran todas sus citas generadas.</h4>

      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 300 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggleClouse}
        size="xl"
        style={{
          position: "absolute",
          right: "0",
          top: "5%",
          left: "5%",
          width: "40%",
        }}
      >
        <ModalHeader toggle={toggleClouse}>Información adicional</ModalHeader>
        <ModalBody>
          <div className="content">
            <Row style={{ color: "white" }}>
              <Col md="12">
                {" "}
                {recomendaciong == "Cambio de filtro de aire" ? (
                  <ExclusivoCambioFiltroAire
                    tipoVehiculo={tipoVehiculo}
                  ></ExclusivoCambioFiltroAire>
                ) : null}
                {recomendaciong == "Cambio de pastillas de freno" ? (
                  <ExclusivoPastillasFreno
                    tipoVehiculo={tipoVehiculo}
                  ></ExclusivoPastillasFreno>
                ) : null}
                {recomendaciong == "Cambio de aceite" ? (
                  <ExclusivoCambioAceite
                    tipoVehiculo={tipoVehiculo}
                    fullSintetico={cincuentaMil}
                  ></ExclusivoCambioAceite>
                ) : null}
                {recomendaciong == "Mantenimiento general" ? (
                  <ExclusivoMantenimientoGeneral
                    tipoVehiculo={tipoVehiculo}
                    fullSintetico={cincuentaMil}
                  ></ExclusivoMantenimientoGeneral>
                ) : null}
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>

      {result.map((obj, key) => (
        <Row key={key}>
          <Col md="12" style={{ paddingRight: "15%", paddingLeft: "15%" }}>
            <Card>
              <CardBody>
                <Row>
                  <Col md="5">
                    <CardTitle tag="h5">Recomendacion</CardTitle>
                    <CardSubtitle tag="h4" className="mb-2 text-muted">
                      {obj.recomendacion.recomendacion}
                    </CardSubtitle>

                    {obj.recomendacion.recomendacion ==
                    "Mantenimiento general" ? (
                      <img src={mantenimientoGeneral} style={{}} alt="Logo" />
                    ) : null}
                    {obj.recomendacion.recomendacion ==
                    "Cambio de pastillas de freno" ? (
                      <img src={cambioPastillasFreno} style={{}} alt="Logo" />
                    ) : null}
                    {obj.recomendacion.recomendacion == "Cambio de aceite" ? (
                      <img src={cambioAceite} style={{}} alt="Logo" />
                    ) : null}
                    {obj.recomendacion.recomendacion ==
                    "Cambio de filtro de aire" ? (
                      <img src={cambioFiltroAire} style={{}} alt="Logo" />
                    ) : null}
                  </Col>
                  <Col md="7" style={{ paddingTop: "5%" }}>
                    <Badge color="secondary" style={{ fontSize: "20px" }}>
                      Información vehículo:
                    </Badge>
                    <ColoredLine color="black" />
                    <Row>
                      <Col
                        md="2"
                        className="mb-2 text-muted"
                        style={{ fontWeight: "bold" }}
                      >
                        Placa
                      </Col>
                      <Col md="10" className="text-muted">
                        {obj.vehiculo.placa}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        md="2"
                        className="mb-2 text-muted"
                        style={{ fontWeight: "bold" }}
                      >
                        Marca
                      </Col>
                      <Col md="10" className="text-muted">
                        {obj.vehiculo.marca}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        md="2"
                        className="mb-2 text-muted"
                        style={{ fontWeight: "bold" }}
                      >
                        Modelo
                      </Col>
                      <Col md="10" className="text-muted">
                        {obj.vehiculo.modelo}
                      </Col>
                    </Row>

                    <Badge color="secondary" style={{ fontSize: "20px" }}>
                      Fecha de la cita:
                    </Badge>
                    <ColoredLine color="black" />

                    <Row>
                      <Col
                        md="4"
                        className="mb-2 text-muted"
                        style={{ fontWeight: "bold" }}
                      >
                        Fecha y hora (*)
                      </Col>
                      <Col md="8" className="text-muted">
                        {obj.fecha} {obj.hora}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Button
                          className="btn-fill"
                          color="primary"
                          onClick={(e) =>
                            toggle(
                              obj.lista_sintomas,
                              obj.recomendacion.recomendacion,
                              obj.tipoVehiculo
                            )
                          }
                        >
                          Ver Detalle
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>

              <CardBody>
                <CardText>(*) Comunicar en caso de no poder asistir</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default Citas;

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 0.5,
    }}
  />
);
