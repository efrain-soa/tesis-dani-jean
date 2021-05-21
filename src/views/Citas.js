import React, { useEffect, useState } from "react";

import axios from "axios";

import cambioFiltroAire from "../assets/img/cambio de filtro de aire.png";
import cambioPastillasFreno from "../assets/img/Cambio de pastillas de freno.png";
import mantenimientoGeneral from "../assets/img/Mantenimiento General.png";
import cambioAceite from "../assets/img/Cambio de aceite.png";

import {
  Col,
  Row,
  Card,
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
        "http://localhost:8080/api/citas/" + usuario.usuario.id + "/true"
      );

      setResult(recomendacionResponse.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return Object.entries(result).length === 0 ? null : (
    <div className="content">
      <h4>Estimado cliente, se muestran todas sus citas generadas.</h4>
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
                    <img src={cambioAceite} style={{}} alt="Logo" />
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
