import React, { useState, useEffect } from "react";
import { Route, useHistory, useLocation, Link } from "react-router-dom";

import cambioFiltroAire from "../assets/img/cambio de filtro de aire.png";
import cambioPastillasFreno from "../assets/img/Cambio de pastillas de freno.png";
import mantenimientoGeneral from "../assets/img/Mantenimiento General.png";
import cambioAceite from "../assets/img/Cambio de aceite.png";

import TimePicker from "react-time-picker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import ReactLoading from "react-loading";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import { differenceInCalendarDays } from "date-fns";

import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routescli.js";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Button,
  Card,
  CardBody,
  Alert,
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

var ps;

function Recomendacion() {
  const location = useLocation();

  const [value, onChange] = useState(new Date());
  const [valueHour, onChangeHour] = useState(new Date());

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [stateSpinner, setStateSpinner] = useState(false);
  const [stateMensaje, setStateMensaje] = useState(false);
  const [hiddenButton, sethiddenButton] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = async () => {
    sethiddenButton(true);
    setStateSpinner(true);

    const registrarCitaRequest = {};

    registrarCitaRequest.usuario = location.usuario;
    registrarCitaRequest.recomendacion = rcmd;
    registrarCitaRequest.fecha = value.toLocaleDateString();
    registrarCitaRequest.hora = valueHour.toLocaleTimeString();
    registrarCitaRequest.lista_sintomas = location.datos.lista_sitomas;
    registrarCitaRequest.vehiculo = location.datos.vehiculo;
    registrarCitaRequest.estado = true;
    console.log(registrarCitaRequest);

    try {
      const recomendacionResponse = await axios.post(
        "http://localhost:8080/api/citas/registrarcita",
        registrarCitaRequest
      );

      setStateSpinner(false);
      setStateMensaje(true);

      setTimeout(() => {
        console.log(recomendacionResponse.data);
        setNestedModal(!nestedModal);
        setCloseAll(true);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

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
              <Link to="/cliente/formulario">
                <Button>Volver</Button>
              </Link>
              <Button className="btn-fill" color="primary" onClick={toggle}>
                Registrar una Cita
              </Button>
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
              <Link to="/cliente/formulario">
                <Button>Volver</Button>
              </Link>
              <Button className="btn-fill" color="primary" onClick={toggle}>
                Registrar una Cita
              </Button>
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
              <Link to="/cliente/formulario">
                <Button>Volver</Button>
              </Link>
              <Button className="btn-fill" color="primary" onClick={toggle}>
                Registrar una Cita
              </Button>
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
              <Link to="/cliente/formulario">
                <Button>Volver</Button>
              </Link>
              <Button className="btn-fill" color="primary" onClick={toggle}>
                Registrar una Cita
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <></>;
    }
  }

  const { placa, modelo, marca, direccion, telefono, descripcion } =
    location.datos.vehiculo;
  const { nombre } = location.usuario;

  const [rcmd, setrcmd] = useState({});

  const [recomendacion, setRecomendacion] = useState(
    "Generando Recomendación..."
  );

  const disabledDates = [new Date("2021/5/25")];

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }
  function tileDisabled({ date, view }) {
    // Disable tiles in month view only
    console.log(view);
    if (view === "month") {
      console.log(date);
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      return disabledDates.find((dDate) => isSameDay(dDate, date));
    }
  }
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
    componentDidMount();
  }, []);

  async function componentDidMount() {
    var sintomasArray = { array: location.array };

    try {
      const recomendacionResponse = await axios.post(
        "https://stormy-inlet-62110.herokuapp.com/sendSymptom",
        sintomasArray
      );

      setRecomendacion(recomendacionResponse.data.recomendacion);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    console.log("fuera");
    if (recomendacion != "Generando Recomendación...") {
      console.log("dentro");
      registrarSintoma();
    }
  }, [recomendacion]);

  async function registrarSintoma() {
    var request = location.datos;

    if (recomendacion == "Mantenimiento general") {
      rcmd.id = "mant123";
      rcmd.codigo = 1;
      rcmd.recomendacion = "Mantenimiento general";
    } else if (recomendacion == "Cambio de pastillas de freno") {
      rcmd.id = "cambpas123";
      rcmd.codigo = 2;
      rcmd.recomendacion = "Cambio de pastillas de freno";
    } else if (recomendacion == "Cambio de aceite") {
      rcmd.id = "aceit234";
      rcmd.codigo = 3;
      rcmd.recomendacion = "Cambio de aceite";
    } else if (recomendacion == "Cambio de filtro de aire") {
      rcmd.id = "aire225";
      rcmd.codigo = 4;
      rcmd.recomendacion = "Cambio de filtro de aire";
    }

    request.recomendacion = rcmd;

    console.log(request);

    const reigsotrSintoma = await axios.post(
      "http://localhost:8080/api/vehiculo/registrarsintoma",
      request
    );
  }
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

          <div>
            <Modal
              isOpen={modal}
              modalTransition={{ timeout: 300 }}
              backdropTransition={{ timeout: 1300 }}
              toggle={toggle}
              size="xl"
              style={{
                position: "absolute",
                right: "0",
                top: "5%",
                left: "5%",
                width: "40%",
              }}
            >
              <ModalHeader toggle={toggle}>
                Seleccione y horario y luego la fecha para su cita :
              </ModalHeader>
              <ModalBody>
                <div className="content">
                  <Row>
                    <Col md="6">
                      <Row>
                        <Calendar
                          onChange={onChange}
                          value={value}
                          tileDisabled={tileDisabled}
                          minDate={new Date()}
                        />
                      </Row>
                    </Col>
                    <Col md="6">
                      <TimePicker
                        amPmAriaLabel="Select AM/PM"
                        clearAriaLabel="Clear value"
                        clockAriaLabel="Toggle clock"
                        hourAriaLabel="Hour"
                        maxDetail="second"
                        isOpen={true}
                        minuteAriaLabel="Minute"
                        nativeInputAriaLabel="Time"
                        onChange={onChangeHour(valueHour)}
                        secondAriaLabel="Second"
                        value={valueHour}
                        amPmAriaLabel="AM/PM"
                      />
                    </Col>
                  </Row>
                </div>
                <Modal
                  isOpen={nestedModal}
                  toggle={toggleNested}
                  onClosed={closeAll ? toggle : undefined}
                >
                  <ModalHeader>
                    Seguro que desea de generar la cita? <br />
                  </ModalHeader>

                  <ModalFooter>
                    <Container>
                      <Row hidden={hiddenButton}>
                        <Col md="6">
                          <Button
                            className="btn-fill"
                            color="primary"
                            onClick={toggleAll}
                            style={{ width: "100%" }}
                          >
                            Si
                          </Button>
                        </Col>
                        <Col md="6">
                          <Button
                            className="btn-fill"
                            color="seconday"
                            onClick={toggleNested}
                            style={{ width: "100%" }}
                          >
                            Cambiar fecha y/u hora.
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md="12"
                          style={{ paddingLeft: "35%", paddingRight: "35%" }}
                        >
                          {stateSpinner ? (
                            <ReactLoading
                              type="bubbles"
                              color="black"
                              width="100px"
                            />
                          ) : null}
                        </Col>

                        <Col md="12">
                          {stateMensaje ? (
                            <Alert color="success">
                              La cita se genero con éxito.
                            </Alert>
                          ) : null}
                        </Col>
                      </Row>
                    </Container>
                  </ModalFooter>
                </Modal>
              </ModalBody>
              <ModalFooter>
                <Container>
                  <Row>
                    <Col md="6">
                      <Button
                        className="btn-fill"
                        color="primary"
                        onClick={toggleNested}
                        style={{ width: "100%" }}
                      >
                        Generar una cita
                      </Button>
                    </Col>
                    <Col md="6">
                      <Button
                        className="btn-fill"
                        color="secondary"
                        onClick={toggle}
                        style={{ width: "100%" }}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </ModalFooter>
            </Modal>
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Recomendacion;
