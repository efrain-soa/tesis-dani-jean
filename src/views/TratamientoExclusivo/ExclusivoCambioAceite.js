import React from "react";

import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardSubtitle,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function ExclusivoCambioAceite(prop) {
  return (
    <>
      {prop.tipoVehiculo == "AUTO" ? (
        <div>
          <Card>
            <CardBody
              style={{
                fontSize: "16px",
                background:
                  "linear-gradient(to right, rgba(225, 78, 202, 0.6) 0%, rgba(225, 78, 202, 0) 100%)",
              }}
            >
              <CardTitle tag="h3"> </CardTitle>
              <CardSubtitle
                tag="h3"
                style={{ color: "white" }}
                className="mb-2 "
              >
                Detalle de Tratamiento
              </CardSubtitle>
              <CardText style={{ color: "white" }}>
                Cantidad de aceite: 4/4 de aceite <br />
                Tipo de aceite:
                {prop.fullSintetico == 1 ? "Semi sentitico" : "Full sintetico"}
                <br />
                Precio: S/ 350.00
              </CardText>
            </CardBody>
          </Card>
        </div>
      ) : null}

      {prop.tipoVehiculo == "CAMIONETA" ? (
        <div>
          <Card>
            <CardBody
              style={{
                fontSize: "16px",
                background:
                  "linear-gradient(to right, rgba(225, 78, 202, 0.6) 0%, rgba(225, 78, 202, 0) 100%)",
              }}
            >
              <CardTitle tag="h3"> </CardTitle>
              <CardSubtitle
                tag="h3"
                style={{ color: "white" }}
                className="mb-2 "
              >
                Detalle de Tratamiento
              </CardSubtitle>
              <CardText style={{ color: "white" }}>
                {" "}
                Cantidad de aceite: 5/4 de aceite <br />
                Tipo de aceite:
                {prop.fullSintetico == 1 ? "Semi sentitico" : "Full sintetico"}
                <br />
                Precio: S/ 400.00
              </CardText>
            </CardBody>
          </Card>
        </div>
      ) : null}
    </>
  );
}

export default ExclusivoCambioAceite;
