import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import sintomas from "./Sintomas";
import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Container,
} from "reactstrap";

function Formulario() {
  const [modal, setModal] = useState(false);

  const [user, setUser] = useState({});

  const [arregloSintomas, setarregloSintomas] = useState([]);

  React.useEffect(() => {
    if (localStorage.getItem("usuario")) {
      const response = JSON.parse(localStorage.getItem("usuario"));

      setUser(response.usuario);
    } else {
      history.push({
        pathname: "/login",
      });
    }
  }, []);

  const toggle = () => {
    setModal(!modal);

    setTimeout(() => {
      setgeneraRecomendacion(false);
    }, 1000);
  };

  // validación y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      marca: "",
      modelo: "",
      placa: "",
      direccion: "",
      numero: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      marca: Yup.string().required("Debe ingresar una marca"),
      modelo: Yup.string().required("Debe ingresar un modelo"),
      placa: Yup.string().required("Debe ingresar una placa"),
      direccion: Yup.string().required("Debe ingresar su dirección"),
      numero: Yup.string()
        .min(9, "Ingrese número válido ")
        .required("Debe ingresar un número"),
      descripcion: Yup.string().required("Debe ingresar una descripcion"),
    }),
    onSubmit: async (userform) => {
      const vehiculo = {
        marca: userform.marca,
        modelo: userform.modelo,
        placa: userform.placa,
        direccion: userform.direccion,
        numero: userform.numero,
        descripcion: userform.descripcion,
        telefono: userform.telefono,
      };

      const datos = { vehiculo: vehiculo, lista_sitomas: arregloSintomas };

      history.push({
        pathname: "/recomendacion",
        array: array,
        usuario: user,
        datos: datos,
      });
    },
  });

  const [generaRecomendacion, setgeneraRecomendacion] = useState(true);

  const history = useHistory();
  const [array, setArray] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  function handleChangeModal(obj) {
    if (obj.target.state) {
      arregloSintomas.push(obj.target.obj);
      array[parseInt(obj.target.value) - 1] = 1;
    } else {
      arregloSintomas.map((sintoma, i, arraysin) => {
        if (sintoma.codigo == obj.target.obj.codigo) {
          arraysin.splice(i, 1);
        }
      });
      array[parseInt(obj.target.value) - 1] = 0;
    }
  }

  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <Form onSubmit={formik.handleSubmit}>
                <CardHeader>
                  <h4 className="title">
                    Ingresa una breve información de tu auto :)
                  </h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <label>Nombre Cliente</label>
                      <Input
                        defaultValue={user.nombre}
                        disabled
                        type="text"
                        name="nombre"
                        style={{ color: "white" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <label>Marca</label>
                      <Input
                        placeholder="Ingrese Marca del Vehiculo"
                        type="text"
                        id="marca"
                        name="marca"
                        value={formik.values.marca}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.marca && formik.errors.marca ? (
                        <div role="alert">
                          <p className="text-danger">{formik.errors.marca} </p>
                        </div>
                      ) : null}
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <label>Placa</label>
                      <Input
                        placeholder="Ingrese su número de placa"
                        type="text"
                        id="placa"
                        name="placa"
                        value={formik.values.placa}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.placa && formik.errors.placa ? (
                        <div role="alert">
                          <p className="text-danger">{formik.errors.placa} </p>
                        </div>
                      ) : null}
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <label>Modelo</label>
                      <Input
                        placeholder="Last Name"
                        type="text"
                        id="modelo"
                        name="modelo"
                        value={formik.values.modelo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.modelo && formik.errors.modelo ? (
                        <div role="alert">
                          <p className="text-danger">{formik.errors.modelo} </p>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <label>Dirección</label>
                      <Input
                        placeholder="Ingrese dirección de domicilio"
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formik.values.direccion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.direccion && formik.errors.direccion ? (
                        <div role="alert">
                          <p className="text-danger">
                            {formik.errors.direccion}{" "}
                          </p>
                        </div>
                      ) : null}
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <label>Número Telefónico</label>
                      <Input
                        placeholder="Ingrese número de contacto"
                        id="numero"
                        name="numero"
                        value={formik.values.numero}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.numero && formik.errors.numero ? (
                        <div role="alert">
                          <p className="text-danger">{formik.errors.numero} </p>
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <label>Breve descripción de su engreido</label>
                      <Input
                        cols="80"
                        placeholder="Cuéntanos acerca de tu auto ..."
                        rows="4"
                        type="textarea"
                        id="descripcion"
                        name="descripcion"
                        value={formik.values.descripcion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.descripcion &&
                      formik.errors.descripcion ? (
                        <div role="alert">
                          <p className="text-danger">
                            {formik.errors.descripcion}{" "}
                          </p>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" onClick={toggle}>
                    Registrar Síntomas
                  </Button>
                  <Button
                    className="btn-fill"
                    color="success"
                    disabled={generaRecomendacion}
                    type="submit"
                  >
                    Generar Recomendación
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
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
            bottom: "2%",
            left: "5%",
          }}
        >
          <ModalHeader toggle={toggle}>
            Seleccione los síntomas que presenta su vehículo:
          </ModalHeader>
          <ModalBody>
            <div className="content">
              <Row>
                {sintomas.map((obj, key) => (
                  <Col md="2" style={{ paddingTop: "3%" }}>
                    <img
                      src={obj.img}
                      style={{ width: "100%", height: "60%" }}
                      alt="Logo"
                    />
                    <Input
                      key={key}
                      type="checkbox"
                      style={{ height: "25px", width: "25px", left: "20%" }}
                      onChange={(e) => {
                        handleChangeModal({
                          target: {
                            obj: obj,
                            name: obj.sintoma,
                            value: obj.codigo,
                            state: e.target.checked,
                          },
                        });
                      }}
                    />
                    {obj.sintoma}
                  </Col>
                ))}
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <Container>
              <Row>
                <Col md="6">
                  <Button
                    className="btn-fill"
                    color="primary"
                    onClick={toggle}
                    style={{ width: "100%" }}
                  >
                    Guardar Cambios
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
    </>
  );
}

export default Formulario;
