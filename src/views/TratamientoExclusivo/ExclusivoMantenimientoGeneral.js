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

function ExclusivoMantenimientoGeneral(prop) {
  return (
    <>
      {prop.tipoVehiculo == "AUTO" ? (
        <div>
          <Card>
            <CardBody style={{ fontSize: "16px" }}>
              <CardTitle tag="h3"> </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Detalle precio AUTO
              </CardSubtitle>
              <CardText>
                Cambio de aceite : <br />- Cantidad de aceite: 4/4 de aceite -
                Tipo de aceite:{" "}
                {prop.fullSintetico == 1 ? "Semi sentitico" : "Full sintetico"}
                <br />
                Cambio de pastillas: <br />
                - Cambio de pastillas: Delanteras
                <br />
                - Adicionales: Mantenimiento de tambor trazero y Ajustes de
                freno
                <br />
                Precio: S/ 650.00 ( Cambio de aceite y Cambio de filtro de aire:
                S/ 350.00 + Cambio de pastillas: S/ 300.00)
                <br />
                Adicionales: <br />
                - Escaneo de vehículo previo al mantenimiento para detectar
                estado general del vehículo.
                <br />
                - Limpieza de Inyectores solo si es necesario.
                <br />
                - El precio de cambio de aceite involucra el cambio de filtro de
                aire solo para mantenimiento general.
                <br />- Se le brindará el reinicio del tablero solo si es
                necesario.
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
                Detalle de precio CAMIONETA
              </CardSubtitle>
              <CardText>
                Cambio de aceite : <br />
                - Cantidad de aceite: 5/4 de aceite <br />- Tipo de aceite:{" "}
                {prop.fullSintetico == 1
                  ? "Full sintetico "
                  : "Semi sentitico "}{" "}
                <br />
                Cambio de pastillas: <br />
                - Cambio de pastillas: Delanteras y Trazeras (4 ruedas) <br />
                - Adicionales: Ajustes de freno <br />
                Precio: S/ 1,000.00 ( Cambio de aceite y Cambio de filtro de
                aire: S/ 400.00 + Cambio de pastillas: S/ 600.00) <br />
                Adicionales: <br />
                - Escaneo de vehículo previo al mantenimiento para detectar
                estado general del vehículo. <br />
                - Limpieza de Inyectores solo si es necesario. <br />
                - El precio de cambio de aceite involucra el cambio de filtro de
                aire solo para mantenimiento general. <br />- Se le brindará el
                reinicio solo si es necesario.
              </CardText>
            </CardBody>
          </Card>
        </div>
      ) : null}
    </>
  );
}

export default ExclusivoMantenimientoGeneral;
