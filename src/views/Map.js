/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  Container,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Table,
  CardTitle,
} from "reactstrap";

import logoEmpresa from "../assets/img/logo-empresa.png";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import "./citas.css";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

function Map() {
  const [result, setResult] = useState([]);
  const defaultValue = {
    year: 0,
    month: 0,
    day: 0,
  };

  const [disabledDays, setdisabledDays] = useState([]);

  const [selectedDay, setSelectedDay] = useState();
  const [miniumDate, setminiumDate] = useState();
  const [manejadorFecha, setManejadorFecha] = useState();

  const handleDisabledSelect = (disabledDay) => {
    setModal(!modal);
    setManejadorFecha(disabledDay);
  };

  const onChangeDay = (event) => {
    setModaldesa(!modaldesa);
    setManejadorFecha(event);
  };

  const desactivarDia = () => {
    desactivarDiaApi(manejadorFecha);
    setModaldesa(!modaldesa);
  };

  const activarDia = () => {
    activarDiaApi(manejadorFecha);
    setModal(!modal);
  };
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [modaldesa, setModaldesa] = useState(false);

  const toggledesa = () => setModaldesa(!modaldesa);

  useEffect(() => {
    var date = new Date();

    defaultValue.year = date.getFullYear();
    defaultValue.month = date.getMonth() + 1;
    defaultValue.day = date.getDate();
    setminiumDate(defaultValue);
    setSelectedDay(defaultValue);

    obtenerCitasDisables();
    obtenerCitasCliete();
  }, []);

  async function obtenerCitasDisables() {
    try {
      const citasDisables = await axios.get(
        "https://api-rest-machinne-citas.herokuapp.com/api/citas/fechasactdeact"
      );

      setdisabledDays(citasDisables.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function activarDiaApi(activ) {
    console.log(activ);
    try {
      const citasActive = await axios.post(
        "https://api-rest-machinne-citas.herokuapp.com/api/citas/activarDia",
        activ
      );

      obtenerCitasDisables();
    } catch (error) {
      console.log(error);
    }
  }

  async function desactivarDiaApi(desac) {
    try {
      const citasDisables = await axios.post(
        "https://api-rest-machinne-citas.herokuapp.com/api/citas/desactivarDia",
        desac
      );

      setdisabledDays([...disabledDays, desac]);
    } catch (error) {
      console.log(error);
    }
  }

  async function obtenerCitasCliete() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario.usuario);
    try {
      const citasResponse = await axios.get(
        "https://api-rest-machinne-citas.herokuapp.com/api/citas/obtenercitas"
      );

      setResult(citasResponse.data);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CALENDARIO</CardTitle>
              </CardHeader>
              <CardBody style={{ textAlign: "center" }}>
                {" "}
                <Calendar
                  minimumDate={miniumDate}
                  value={selectedDay}
                  onChange={onChangeDay}
                  disabledDays={disabledDays} // here we pass them
                  onDisabledDayError={handleDisabledSelect} // handle error
                  shouldHighlightWeekends
                  calendarClassName="myCustomCalendar"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CITAS REGISTRADAS</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>CLIENTE</th>
                      <th>PLACA</th>
                      <th>MARCA</th>
                      <th>MODELO</th>
                      <th>SERVICIO</th>
                      <th>FECHA Y HORA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((obj, index) => {
                      return (
                        <tr key={obj.id}>
                          <td>
                            {obj.usuario.nombre} {obj.usuario.apellidos}
                          </td>
                          <td>{obj.vehiculo.placa}</td>
                          <td>{obj.vehiculo.marca}</td>
                          <td>{obj.vehiculo.modelo}</td>
                          <td>{obj.recomendacion.recomendacion}</td>
                          <td>
                            {obj.fecha}{" "}
                            {obj.hora.length > 8
                              ? new Date(obj.hora).getHours() +
                                ":" +
                                new Date(obj.hora).getMinutes() +
                                ":" +
                                new Date(obj.hora).getSeconds()
                              : obj.hora}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Se encuentra a punto de activar el dia seleccionado
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Container>
              <Row>
                <Col md="6">
                  <Button
                    className="btn-fill"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={activarDia}
                  >
                    Activar dia
                  </Button>
                </Col>
                <Col md="6">
                  <Button
                    className="btn-fill"
                    color="secondary"
                    onClick={toggle}
                    style={{ width: "100%" }}
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </Container>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modaldesa} toggle={toggledesa}>
          <ModalHeader toggle={toggledesa}>Fechas de atención</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Container>
              <Row>
                <Col md="6">
                  <Button
                    className="btn-fill"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={desactivarDia}
                  >
                    Desactivar día
                  </Button>
                </Col>
                <Col md="6">
                  <Button
                    className="btn-fill"
                    color="secondary"
                    onClick={toggledesa}
                    style={{ width: "100%" }}
                  >
                    Cancelar
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

export default Map;
