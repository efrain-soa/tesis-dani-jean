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
  Row,
  Col,
  Table,
  CardTitle,
} from "reactstrap";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

function Map() {
  const [result, setResult] = useState([]);
  const defaultValue = {
    year: 0,
    month: 0,
    day: 0,
  };

  const disabledDays = [
    {
      year: 2019,
      month: 3,
      day: 20,
    },
    {
      year: 2019,
      month: 3,
      day: 21,
    },
    {
      year: 2019,
      month: 3,
      day: 7,
    },
  ];

  const [selectedDay, setSelectedDay] = useState();
  const [miniumDate, setminiumDate] = useState();

  const handleDisabledSelect = (disabledDay) => {
    console.log("Tried selecting a disabled day", disabledDay);
  };

  useEffect(() => {
    obtenerCitasCliete();
    var date = new Date();

    defaultValue.year = date.getFullYear();
    defaultValue.month = date.getMonth() + 1;
    defaultValue.day = date.getDate();
    setminiumDate(defaultValue);
    setSelectedDay(defaultValue);
  }, []);

  async function obtenerCitasCliete() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario.usuario);
    try {
      const citasResponse = await axios.get(
        "http://localhost:8080/api/citas/obtenercitas"
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
              <CardBody>
                {" "}
                <Calendar
                  minimumDate={miniumDate}
                  value={selectedDay}
                  onChange={setSelectedDay}
                  disabledDays={disabledDays} // here we pass them
                  onDisabledDayError={handleDisabledSelect} // handle error
                  locale="en"
                  shouldHighlightWeekends
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
                            {obj.fecha} {obj.hora}
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
    </>
  );
}

export default Map;
