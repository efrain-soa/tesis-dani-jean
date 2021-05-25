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

function ExclusivoPastillasFreno(prop) {
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
              <CardText>
                Cambio de pastillas: Delanteras <br />
                Adicionales: <br />
                - Mantenimiento de tambor trazero. <br />
                - Ajustes de freno
                <br />
                Precio: S/ 300.00
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
              <CardText>
                Cambio de pastillas: Delanteras y Trazeras (4 ruedas) <br />
                Adicionales: Ajustes de frenos
                <br />
                Precio: S/ 600.00
              </CardText>
            </CardBody>
          </Card>
        </div>
      ) : null}
    </>
  );
}

export default ExclusivoPastillasFreno;
