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

function ExclusivoCambioFiltroAire(prop) {
  return (
    <>
      {prop.tipoVehiculo == "AUTO" ? (
        <div>
          <Card>
            <CardBody style={{ fontSize: "16px" }}>
              <CardTitle tag="h3"> </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Detalle de precio
              </CardSubtitle>
              <CardText>Precio : 40 soles</CardText>
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
              <CardText>Precio : 40 soles</CardText>
            </CardBody>
          </Card>
        </div>
      ) : null}
    </>
  );
}

export default ExclusivoCambioFiltroAire;