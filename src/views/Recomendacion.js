import React, { useState } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";

import cambioFiltroAire from "../assets/img/cambio de filtro de aire.png";
import cambioPastillasFreno from "../assets/img/Cambio de pastillas de freno.png";
import mantenimientoGeneral from "../assets/img/Mantenimiento General.png";
import cambioAceite from "../assets/img/Cambio de aceite.png";

import axios from "axios";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";

import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routescli.js";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col,
  CardImg,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

import {} from "reactstrap";
var ps;

function Recomendacion() {
  const location = useLocation();

  function Servicios(props) {
    if (props.servicio == "Mantenimiento general") {
      return (
        <div>
          <Card>
            <CardImg
              style={{ width: "100%", height: "240px" }}
              src={mantenimientoGeneral}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h3">{recomendacion}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Explicación
              </CardSubtitle>
              <CardText>
                Importancia de un mantenimiento General: <br />
                <br />
                <ol>
                  <li>Previenes reparaciones costosas.</li>
                  <li>Aumentas la eficiencia de combustible</li>
                  <li>Evitas que te quedes varado en el camino</li>
                  <li>Mantienes a otros conductores seguros</li>
                  <li>Proporciona tranquilidad</li>
                </ol>
              </CardText>
              <Button>Volver</Button>
            </CardBody>
          </Card>
        </div>
      );
    } else if (props.servicio == "Cambio de pastillas de freno") {
      return (
        <div>
          <Card>
            <CardImg
              style={{ width: "100%", height: "240px" }}
              src={cambioPastillasFreno}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h3">{recomendacion}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Explicación
              </CardSubtitle>
              <CardText>
                La razón por la que se deben cambiar las pastillas de freno es
                sencilla: seguridad. Unas pastillas desgastadas provocan una
                mayor distancia de frenado, reduciendo así nuestra seguridad y
                eficacia al momento de frenar.
              </CardText>
              <Button>Volver</Button>
            </CardBody>
          </Card>
        </div>
      );
    } else if (props.servicio == "Cambio de aceite") {
      return (
        <div>
          <Card>
            <CardImg
              style={{ width: "100%", height: "240px" }}
              src={cambioAceite}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h3">{recomendacion}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Explicación
              </CardSubtitle>
              <CardText>
                El cambio de aceite sirve para cambiar el aceite del motor, lo
                que permite mejorar lubricación. Al circular por el interior del
                motor, el aceite reduce la fricción entre las piezas metálicas
              </CardText>
              <Button>Volver</Button>
            </CardBody>
          </Card>
        </div>
      );
    } else if (props.servicio == "Cambio de filtro de aire") {
      return (
        <div>
          <Card>
            <CardImg
              style={{ width: "100%", height: "240px" }}
              src={cambioFiltroAire}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h3">{recomendacion}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Explicación
              </CardSubtitle>
              <CardText>
                Su cometido es el de purificar el aire que entra en nuestro
                vehículo, limpiándolo de los posibles impurezas como polvo,
                polen y bacterias del exterior sobre todo cuando nos encontramos
                en la ciudad.
              </CardText>
              <Button>Volver</Button>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <></>;
    }
  }

  const { placa, modelo, marca, direccion, telefono, descripcion } =
    location.datos;
  const { nombre } = location.usuario;

  const [recomendacion, setRecomendacion] = useState(
    "Generando Recomendación..."
  );

  const history = useHistory();
  var routesFinal = [];
  React.useEffect(() => {
    routes.map((prop, key) => {
      if (prop.layout == "/cliente") {
        routesFinal.push(prop);
      }
    });
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario === null) {
      history.push({
        pathname: "/login",
      });
    } else {
    }
  }, []);

  React.useEffect(() => {
    var sintomasArray = { array: location.array };
    try {
      const recomendacion = axios.post(
        "https://stormy-inlet-62110.herokuapp.com/sendSymptom",
        sintomasArray
      );
      recomendacion.then((obj) => setRecomendacion(obj.data.recomendacion));
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/cliente") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Recomendacion";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "Creative Tim",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />

              <div className="content">
                <Card className="card-user block" style={{ padding: "5%" }}>
                  <CardBody>
                    <CardText />
                    <div className="author">
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <h2 className="title">A&S Palermo SAC</h2>
                      </a>
                      <p className="description">Recomendacion de servicios</p>
                    </div>
                    <div
                      className="card-description"
                      style={{ fontSize: "20px" }}
                    >
                      <Row>
                        <Col md="5">
                          <Row>
                            <Col md="3">Cliente : </Col>
                            <Col md="9"> {nombre}</Col>
                          </Row>
                          <Row>
                            <Col md="3">Placa : </Col>
                            <Col md="9"> {placa}</Col>
                          </Row>
                          <Row>
                            <Col md="3">Marca : </Col>
                            <Col md="9">{marca}</Col>
                          </Row>
                          <Row>
                            <Col md="3">Modelo : </Col>
                            <Col md="9">{modelo}</Col>
                          </Row>
                          <Row>
                            <Col md="5">Recomendacion : </Col>
                            <Col md="7">{recomendacion}</Col>
                          </Row>
                        </Col>
                        <Col nd="7">
                          <Servicios servicio={recomendacion} />
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="button-container">
                      <Button className="btn-icon btn-round" color="facebook">
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button className="btn-icon btn-round" color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button className="btn-icon btn-round" color="google">
                        <i className="fab fa-google-plus" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Recomendacion;
