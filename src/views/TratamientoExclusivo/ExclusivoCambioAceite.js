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
            <CardBody style={{ fontSize: "16px" }}>
              <CardTitle tag="h3"> </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Detalle precio
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
            <CardBody style={{ fontSize: "16px" }}>
              <CardTitle tag="h3"> </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Detalle de precio
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
