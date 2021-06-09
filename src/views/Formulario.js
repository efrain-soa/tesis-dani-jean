import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import sintomas from "./Sintomas";
import "react-datepicker/dist/react-datepicker.css";
import MaskInput from "react-maskinput";
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
  Dropdown,
  DropdownToggle,
  FormGroup,
  Label,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Container,
} from "reactstrap";

function Formulario() {
  const [modal, setModal] = useState(false);

  const [user, setUser] = useState({});

  const [arregloSintomas, setarregloSintomas] = useState([]);
  const [tipoVehiculo, settipoVehiculo] = useState("");

  React.useEffect(() => {
    if (localStorage.getItem("usuario")) {
      const response = JSON.parse(localStorage.getItem("usuario"));

      setUser(response.usuario);
      componentDidMount();
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
      kilometraje: "",
      tipoVehiculo: "",
    },
    validationSchema: Yup.object({
      marca: Yup.string().required("Debe ingresar una marca"),
      modelo: Yup.string().required("Debe ingresar un modelo"),
      placa: Yup.string()
        .min(7, "Debe ingresar una placa válida (Formato :XXX-XXX)")
        .max(7, "Debe ingresar una placa válida (Formato :XXX-XXX)")
        .trim()
        .matches(
          /^[-1234567890A-Za-z]+$/,
          "Debe ingresar una placa válida (Formato :XXX-XXX)"
        )
        .required("Debe ingresar una placa"),

      direccion: Yup.string()
        .min(5, "Debe ingresar mínimo 5 caracteres")
        .max(100, "Debe ingresar máximo 100 caracteres")
        .required("Debe ingresar su dirección"),
      numero: Yup.string()
        .min(9, "Ingrese número válido")
        .max(9, "Ingrese número válido")
        .matches(
          /^[1234567890]+$/,
          "Debe ingresar un formato de celular válido (Formato: 987654321)"
        )
        .required("Debe ingresar un número"),
      kilometraje: Yup.string()
        .min(1, "Debe ingresar mínimo 1 dígito")
        .max(6, "Debe ingresar máximo 6 dígitos")
        .matches(
          /^[1234567890]+$/,
          "Debe ingresar un formato de kilometraje válido (Formato: 5000)"
        )
        .required("Debe ingresar el kilometraje del vehículo"),
      tipoVehiculo: Yup.string().required(
        "Debe seleccionar un tipo de vehículo."
      ),
    }),
    onSubmit: async (userform) => {
      const vehiculo = {
        marca: userform.marca,
        modelo: userform.modelo,
        placa: userform.placa,
        direccion: userform.direccion,
        numero: userform.numero,
        kilometraje: userform.kilometraje,
        telefono: userform.telefono,
      };

      const datos = { vehiculo: vehiculo, lista_sitomas: arregloSintomas };

      history.push({
        pathname: "/recomendacion",
        array: array,
        usuario: user,
        datos: datos,
        tipoVehiculo: userform.tipoVehiculo,
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

  function onChangeValue(e) {
    console.log(e.target);
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDrop = () => setDropdownOpen((prevState) => !prevState);

  const [dropdownOpenModelo, setDropdownOpenModelo] = useState(false);

  const [arrayMarca, setMarcas] = useState([
    { id: 1, marca: "AUDI" },
    { id: 2, marca: "BAW" },
    { id: 3, marca: "BMW" },
    { id: 4, marca: "BYD" },
    { id: 5, marca: "CHANGHE" },
    { id: 6, marca: "CHERY" },
    { id: 7, marca: "CHEVROLET" },
    { id: 8, marca: "CHRYSLER" },
    { id: 9, marca: "CITROEN" },
    { id: 10, marca: "DAEWOO" },
    { id: 11, marca: "DAITHASU" },
    { id: 12, marca: "DFSK" },
    { id: 13, marca: "DODGE" },
    { id: 14, marca: "DONGFENG" },
    { id: 15, marca: "FAW" },
    { id: 16, marca: "FIAT" },
    { id: 17, marca: "FORD" },
    { id: 18, marca: "GEELY" },
    { id: 19, marca: "GREAT" },
    { id: 20, marca: "HAFEI" },
    { id: 21, marca: "HONDA" },
    { id: 22, marca: "HYUNDAI" },
    { id: 23, marca: "ISUZU" },
    { id: 24, marca: "JEEP" },
    { id: 25, marca: "JMC" },
    { id: 26, marca: "KIA" },
    { id: 27, marca: "LAND ROVER" },
    { id: 28, marca: "LANDWIND" },
    { id: 29, marca: "MAZDA" },
    { id: 30, marca: "MERCEDES BENZ" },
    { id: 31, marca: "MG" },
    { id: 32, marca: "MINI" },
    { id: 33, marca: "MITSUBISHI" },
    { id: 34, marca: "NISSAN" },
    { id: 35, marca: "PEUGEOT" },
    { id: 36, marca: "PORSCHE" },
    { id: 37, marca: "RENAULT" },
    { id: 38, marca: "SEAT" },
    { id: 39, marca: "SOUEAST" },
    { id: 40, marca: "SSANGYONG" },
    { id: 41, marca: "SUBARU" },
    { id: 42, marca: "SUZUKI" },
    { id: 43, marca: "TOYOTA" },
    { id: 44, marca: "VOLKSWAGEN" },
    { id: 45, marca: "VOLVO" },
  ]);
  const [arrayModelo, setArrayModelo] = useState([
    {
      marca: "AUDI",
      modelos: [
        { id: 1, modelo: "A3" },
        { id: 2, modelo: "A4" },
        { id: 3, modelo: "A5" },
        { id: 4, modelo: "A7" },
        { id: 5, modelo: "A8" },
        { id: 6, modelo: "Q2" },
        { id: 7, modelo: "Q3" },
        { id: 8, modelo: "Q5" },
        { id: 9, modelo: "Q7" },
        { id: 10, modelo: "Q8" },
        { id: 11, modelo: "TT" },
        { id: 12, modelo: "R8" },
      ],
    },
    {
      marca: "BAW",
      modelos: [{ id: 1, modelo: "INCA" }],
    },
    {
      marca: "BMW",
      modelos: [
        { id: 1, modelo: "X1" },
        { id: 2, modelo: "X2" },
        { id: 3, modelo: "X3" },
        { id: 4, modelo: "X4" },
        { id: 5, modelo: "X5" },
        { id: 6, modelo: "X6" },
        { id: 7, modelo: "X7" },
        { id: 8, modelo: "SERIE 1" },
        { id: 9, modelo: "SERIE 2" },
        { id: 10, modelo: "SERIE 3" },
        { id: 11, modelo: "M3" },
        { id: 12, modelo: "SERIE 4" },
        { id: 13, modelo: "M4" },
        { id: 14, modelo: "M440i" },
        { id: 15, modelo: "SERIE 5" },
        { id: 16, modelo: "SERIE 7" },
        { id: 17, modelo: "SERIE 8" },
        { id: 18, modelo: "Z4" },
        { id: 19, modelo: "Z4 M40i" },
      ],
    },
    {
      marca: "BYD",
      modelos: [{ id: 1, modelo: "F3" }],
    },
    {
      marca: "CHANGHE",
      modelos: [
        { id: 1, modelo: "CH6390LE" },
        { id: 2, modelo: "Q35" },
        { id: 3, modelo: "M50S" },
      ],
    },
    {
      marca: "CHERY",
      modelos: [
        { id: 1, modelo: "ARRIZO 3" },
        { id: 2, modelo: "TIGGO 8" },
        { id: 3, modelo: "TIGGO 7" },
        { id: 4, modelo: "TIGGO 2" },
        { id: 5, modelo: "K60" },
      ],
    },
    {
      marca: "CHEVROLET",
      modelos: [
        { id: 1, modelo: "AVEO" },
        { id: 2, modelo: "CRUZE" },
        { id: 3, modelo: "SAIL" },
        { id: 4, modelo: "VIVANT" },
        { id: 5, modelo: "ORLANDO" },
        { id: 6, modelo: "SONIC" },
        { id: 7, modelo: "CAMARO" },
        { id: 8, modelo: "CAPTIVA" },
        { id: 9, modelo: "OPTRA" },
        { id: 10, modelo: "EXPRESS" },
        { id: 11, modelo: "EQUINOX" },
        { id: 12, modelo: "OPTRA" },
        { id: 13, modelo: "SPARK" },
        { id: 14, modelo: "NPR70PL" },
      ],
    },
    {
      marca: "CHRYSLER",
      modelos: [
        { id: 1, modelo: "PACIFICA" },
        { id: 2, modelo: "300" },
        { id: 3, modelo: "VOYAGRER" },
      ],
    },
    {
      marca: "CITROEN",
      modelos: [
        { id: 1, modelo: "BERLINGO" },
        { id: 2, modelo: "C4" },
        { id: 3, modelo: "C3" },
        { id: 4, modelo: "C5" },
      ],
    },
    {
      marca: "DAEWOO",
      modelos: [
        { id: 1, modelo: "NUBIRA" },
        { id: 2, modelo: "MATIZ" },
        { id: 3, modelo: "KALOS" },
        { id: 4, modelo: "LACETTI" },
        { id: 5, modelo: "TACUMA" },
      ],
    },
    {
      marca: "DAITHASU",
      modelos: [{ id: 1, modelo: "DELTA 400" }],
    },
    {
      marca: "DFSK",
      modelos: [
        { id: 1, modelo: "K07S" },
        { id: 2, modelo: "GLORY 560" },
        { id: 3, modelo: "GLORY 580" },
        { id: 4, modelo: "GLORY IX5" },
      ],
    },
    {
      marca: "DODGE",
      modelos: [
        { id: 1, modelo: "CARAVAN" },
        { id: 2, modelo: "DURANGO" },
        { id: 3, modelo: "JOURNEY" },
      ],
    },
    {
      marca: "DONGFENG",
      modelos: [
        { id: 1, modelo: "AX4" },
        { id: 2, modelo: "SX5" },
        { id: 3, modelo: "AX7" },
        { id: 4, modelo: "SX6" },
        { id: 5, modelo: "S500" },
        { id: 6, modelo: "M3" },
        { id: 7, modelo: "RICH 6" },
      ],
    },
    {
      marca: "FAW",
      modelos: [
        { id: 1, modelo: "CA1024VL" },
        { id: 2, modelo: "N5" },
      ],
    },
    {
      marca: "FIAT",
      modelos: [
        { id: 1, modelo: "FIORINO" },
        { id: 2, modelo: "MOBI" },
        { id: 3, modelo: "UNO WAY" },
        { id: 4, modelo: "CRONOS" },
        { id: 5, modelo: "ARGO" },
        { id: 6, modelo: "DUCATO" },
      ],
    },
    {
      marca: "FORD",
      modelos: [
        { id: 1, modelo: "ECOSPORT" },
        { id: 2, modelo: "EXPLORER" },
        { id: 3, modelo: "MUSTANG" },
        { id: 4, modelo: "LASER" },
        { id: 5, modelo: "TERRITORY" },
        { id: 6, modelo: "FIESTA" },
        { id: 7, modelo: "FOCUS" },
        { id: 8, modelo: "RANGER" },
        { id: 9, modelo: "EXPEDITION" },
        { id: 10, modelo: "EDGE" },
      ],
    },
    {
      marca: "GEELY",
      modelos: [
        { id: 1, modelo: "GC7" },
        { id: 2, modelo: "CK" },
        { id: 3, modelo: "C-ELYSEE" },
      ],
    },
    {
      marca: "GREAT",
      modelos: [
        { id: 1, modelo: "HAVAL H5" },
        { id: 2, modelo: "HAVAL H3" },
        { id: 3, modelo: "VOLEEX C30" },
        { id: 4, modelo: "WALL M4" },
      ],
    },
    {
      marca: "HAFEI",
      modelos: [
        { id: 1, modelo: "JUNYI" },
        { id: 2, modelo: "LUZUN" },
      ],
    },
    {
      marca: "HONDA",
      modelos: [
        { id: 1, modelo: "CIVIC" },
        { id: 2, modelo: "PILOT" },
        { id: 3, modelo: "HR-V" },
        { id: 4, modelo: "FIT" },
        { id: 5, modelo: "PARTNER" },
        { id: 6, modelo: "LEGEND" },
        { id: 7, modelo: "ACCORD" },
        { id: 8, modelo: "INTEGRA" },
      ],
    },
    {
      marca: "HYUNDAI",
      modelos: [
        { id: 1, modelo: "TUCSON" },
        { id: 2, modelo: "ACCENT" },
        { id: 3, modelo: "ELANTRA" },
        { id: 4, modelo: "SANTA FE" },
        { id: 5, modelo: "TERRACAN" },
        { id: 6, modelo: "GALLOPER" },
        { id: 7, modelo: "EXCEL" },
        { id: 8, modelo: "H1" },
        { id: 9, modelo: "VELOSTER" },
        { id: 10, modelo: "GETZ" },
        { id: 11, modelo: "TIBURON" },
        { id: 12, modelo: "GRACE" },
        { id: 13, modelo: "AZERA" },
        { id: 14, modelo: "SONATA" },
        { id: 15, modelo: "I10" },
      ],
    },
    {
      marca: "ISUZU",
      modelos: [{ id: 1, modelo: "BALENO" }],
    },
    {
      marca: "JEEP",
      modelos: [
        { id: 1, modelo: "CHEROKEE" },
        { id: 2, modelo: "RENEGADE" },
        { id: 3, modelo: "COMPASS" },
        { id: 4, modelo: "WRANGLER" },
        { id: 5, modelo: "GLADIATOR" },
      ],
    },
    {
      marca: "JMC",
      modelos: [
        { id: 1, modelo: "VIGUS 3" },
        { id: 2, modelo: "VIGUS 5" },
      ],
    },
    {
      marca: "KIA",
      modelos: [
        { id: 1, modelo: "SPORTAGE" },
        { id: 2, modelo: "CERATO" },
        { id: 3, modelo: "SORENTO" },
        { id: 4, modelo: "RIO" },
        { id: 5, modelo: "PICANTO" },
        { id: 6, modelo: "CARENS" },
        { id: 7, modelo: "CARNIVAL" },
        { id: 8, modelo: "SOUL" },
        { id: 9, modelo: "PREGIO" },
      ],
    },
    {
      marca: "LAND ROVER",
      modelos: [
        { id: 1, modelo: "DISCOVERY" },
        { id: 2, modelo: "RANGE ROVER" },
        { id: 3, modelo: "DEFENDER" },
      ],
    },
    {
      marca: "LANDWIND",
      modelos: [{ id: 1, modelo: "X6" }],
    },
    {
      marca: "MAZDA",
      modelos: [
        { id: 1, modelo: "CX-5" },
        { id: 2, modelo: "2" },
        { id: 3, modelo: "3" },
        { id: 4, modelo: "6" },
        { id: 5, modelo: "CX-9" },
        { id: 6, modelo: "CX-30" },
        { id: 7, modelo: "CX-3" },
        { id: 8, modelo: "BT-50" },
        { id: 9, modelo: "B2500" },
      ],
    },
    {
      marca: "MERCEDES BENZ",
      modelos: [
        { id: 1, modelo: "C200" },
        { id: 2, modelo: "A200" },
        { id: 3, modelo: "C180" },
        { id: 4, modelo: "E240" },
        { id: 5, modelo: "GL 400" },
        { id: 6, modelo: "ML 350" },
      ],
    },
    {
      marca: "MG",
      modelos: [
        { id: 1, modelo: "MG3" },
        { id: 2, modelo: "MG5" },
        { id: 3, modelo: "MG6" },
        { id: 4, modelo: "MG ZX" },
        { id: 5, modelo: "MG RX5" },
        { id: 6, modelo: "MG HS" },
      ],
    },
    {
      marca: "MINI",
      modelos: [
        { id: 1, modelo: "3" },
        { id: 2, modelo: "5" },
        { id: 3, modelo: "CABRIO" },
        { id: 4, modelo: "COOPER" },
        { id: 5, modelo: "COUNTRYMAN" },
        { id: 6, modelo: "CLUBMAN" },
      ],
    },
    {
      marca: "MITSUBISHI",
      modelos: [
        { id: 1, modelo: "MONTERO LARGA" },
        { id: 2, modelo: "LANCER" },
        { id: 3, modelo: "ASX" },
        { id: 4, modelo: "MIRAGE" },
        { id: 5, modelo: "XPANDER" },
        { id: 6, modelo: "OUTLANDER" },
        { id: 7, modelo: "MONTERO" },
      ],
    },
    {
      marca: "NISSAN",
      modelos: [
        { id: 1, modelo: "SENTRA" },
        { id: 2, modelo: "FRONTIER" },
        { id: 3, modelo: "XTRAIL" },
        { id: 4, modelo: "TIIDA" },
        { id: 5, modelo: "PATHFINDER" },
        { id: 6, modelo: "ALMERA" },
        { id: 7, modelo: "TITAN" },
        { id: 8, modelo: "PRIMERA" },
        { id: 10, modelo: "SUNNY" },
        { id: 11, modelo: "BLUEBIRD" },
        { id: 12, modelo: "QASHQAI" },
        { id: 13, modelo: "URVAN" },
        { id: 14, modelo: "NOTE" },
        { id: 15, modelo: "NAVARA" },
        { id: 16, modelo: "AVENIR" },
        { id: 17, modelo: "MARCH" },
      ],
    },
    {
      marca: "PEUGEOT",
      modelos: [
        { id: 1, modelo: "206" },
        { id: 2, modelo: "PARTNER" },
        { id: 3, modelo: "3008" },
        { id: 4, modelo: "2008" },
        { id: 5, modelo: "208" },
        { id: 6, modelo: "5008" },
        { id: 7, modelo: "BOXER" },
      ],
    },
    {
      marca: "PORSCHE",
      modelos: [
        { id: 1, modelo: "718" },
        { id: 2, modelo: "911" },
        { id: 3, modelo: "TAYCAN" },
        { id: 4, modelo: "PANAMERA" },
        { id: 5, modelo: "MACAN" },
      ],
    },
    {
      marca: "RENAULT",
      modelos: [
        { id: 1, modelo: "KWID" },
        { id: 2, modelo: "LOGAN" },
        { id: 3, modelo: "STEPWAY" },
        { id: 4, modelo: "DUSTER" },
        { id: 5, modelo: "CAPTUR" },
        { id: 6, modelo: "KANGOO" },
      ],
    },
    {
      marca: "SEAT",
      modelos: [
        { id: 1, modelo: "IBIZA" },
        { id: 2, modelo: "LEON" },
        { id: 3, modelo: "ARONA" },
        { id: 4, modelo: "ATECA" },
      ],
    },
    {
      marca: "SOUEAST",
      modelos: [
        { id: 1, modelo: "DX7" },
        { id: 2, modelo: "A5" },
        { id: 3, modelo: "DX3" },
      ],
    },
    {
      marca: "SSANGYONG",
      modelos: [
        { id: 1, modelo: "RODIUS" },
        { id: 2, modelo: "KORANDO" },
        { id: 3, modelo: "ACTYON" },
        { id: 4, modelo: "TIVOLI" },
        { id: 5, modelo: "MUSSO" },
        { id: 6, modelo: "REXTON" },
      ],
    },
    {
      marca: "SUBARU",
      modelos: [
        { id: 1, modelo: "FORESTER" },
        { id: 2, modelo: "LEGACY" },
        { id: 3, modelo: "OUTBACK" },
        { id: 4, modelo: "WRX" },
        { id: 5, modelo: "IMPREZA" },
        { id: 6, modelo: "XV" },
        { id: 7, modelo: "EVOLTIS" },
      ],
    },
    {
      marca: "SUZUKI",
      modelos: [
        { id: 1, modelo: "GRAND NOMADE" },
        { id: 2, modelo: "SWIFT" },
        { id: 3, modelo: "RENO" },
        { id: 4, modelo: "SX-4" },
        { id: 5, modelo: "GRAND VITARA" },
        { id: 6, modelo: "XL-7" },
        { id: 7, modelo: "CELERIO" },
        { id: 8, modelo: "AERIO" },
        { id: 9, modelo: "JIMMY" },
        { id: 10, modelo: "APV" },
      ],
    },
    {
      marca: "TOYOTA",
      modelos: [
        { id: 1, modelo: "LAND CRUSIER" },
        { id: 2, modelo: "HI-LUX" },
        { id: 3, modelo: "YARIS" },
        { id: 4, modelo: "COROLLA" },
        { id: 5, modelo: "RAV4" },
        { id: 6, modelo: "CORONA" },
        { id: 7, modelo: "AVENSIS" },
        { id: 8, modelo: "FORTUNER" },
        { id: 9, modelo: "SPRINTER" },
        { id: 10, modelo: "CAMRY" },
        { id: 11, modelo: "GAIA" },
        { id: 12, modelo: "IPSUM" },
        { id: 13, modelo: "STARLET" },
        { id: 14, modelo: "URBAN CRUISER" },
        { id: 15, modelo: "TACOMA" },
        { id: 16, modelo: "4 RUNNER" },
        { id: 17, modelo: "PRADO" },
        { id: 18, modelo: "AURIS" },
        { id: 19, modelo: "HI-ACE" },
        { id: 20, modelo: "PROBOX" },
      ],
    },
    {
      marca: "VOLKSWAGEN",
      modelos: [
        { id: 1, modelo: "GOL" },
        { id: 2, modelo: "AMAROK" },
        { id: 3, modelo: "JETTA" },
        { id: 4, modelo: "TIGUAN" },
        { id: 5, modelo: "VOYAGE" },
        { id: 6, modelo: "CADDY" },
        { id: 7, modelo: "PASSAT" },
        { id: 8, modelo: "BORA" },
        { id: 9, modelo: "1300" },
      ],
    },
    {
      marca: "VOLVO",
      modelos: [
        { id: 1, modelo: "S60" },
        { id: 2, modelo: "S40" },
        { id: 3, modelo: "XC40" },
        { id: 4, modelo: "XC60" },
        { id: 5, modelo: "XC90" },
        { id: 6, modelo: "V60" },
      ],
    },
  ]);

  const [itemsModelo, setItemsModelo] = useState([]);
  const [itemsModelx, setItemsModelx] = useState([]);

  const [arrayModels, setModels] = useState([]);

  const toggleDropModelo = () =>
    setDropdownOpenModelo((prevState) => !prevState);

  const [marcaSeleccionada, setMarcaSeleccionada] = useState();

  const onclickMarca = (e) => {
    formik.initialValues.marca = e;
    formik.values.marca = e;

    setMarcaSeleccionada(e);
    arrayModelo.map((prop, key) => {
      if (prop.marca == e) {
        setModels(prop.modelos);
      }
    });
  };

  React.useEffect(() => {
    componentDidMount2();
  }, [arrayModels]);
  const onclickModelo = (e) => {
    formik.initialValues.modelo = e;
    formik.values.modelo = e;
  };

  function componentDidMount() {
    let MarcaItems = [];
    arrayMarca.forEach((obj, index) => {
      MarcaItems.push(
        <DropdownItem key={index} onClick={(e) => onclickMarca(obj.marca)}>
          {obj.marca}
        </DropdownItem>
      );
    });
    setItemsModelo(MarcaItems);
  }

  function componentDidMount2() {
    let ModeloItems = [];
    arrayModels.forEach((obj, index) => {
      ModeloItems.push(
        <DropdownItem key={index} onClick={(e) => onclickModelo(obj.modelo)}>
          {obj.modelo}
        </DropdownItem>
      );
    });
    setItemsModelx(ModeloItems);
  }

  function justNumber(e) {
    if (!Number(e.target.value)) {
      return;
    }

    formik.values.numero = e.target.value;
  }
  //const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <Form onSubmit={formik.handleSubmit}>
                <CardHeader>
                  <h4 className="title">
                    Datos del vehículo
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
                    <Col className="pr-md-1" md="2">
                      <label>Marca</label>
                      <Input
                        placeholder="Ingrese Marca del Vehiculo"
                        type="text"
                        id="marca"
                        name="marca"
                        disabled
                        style={{ color: "white" }}
                        value={formik.initialValues.marca}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.touched.marca && formik.errors.marca ? (
                        <div role="alert">
                          <p className="text-danger">{formik.errors.marca} </p>
                        </div>
                      ) : null}
                    </Col>
                    <Col className="" md="2">
                      <label></label>
                      <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
                        <DropdownToggle>Seleccione</DropdownToggle>
                        <DropdownMenu
                          modifiers={{
                            setMaxHeight: {
                              enabled: true,
                              order: 890,
                              fn: (data) => {
                                return {
                                  ...data,
                                  styles: {
                                    ...data.styles,
                                    overflow: "auto",
                                    maxHeight: 200,
                                  },
                                };
                              },
                            },
                          }}
                        >
                          {itemsModelo}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                    <Col className="pl-md-1" md="2">
                      <label>Modelo</label>
                      <Input
                        placeholder="Ingrese Modelo del vehículo"
                        type="text"
                        id="modelo"
                        name="modelo"
                        disabled
                        value={formik.initialValues.modelo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ color: "white" }}
                      />
                      {formik.touched.modelo && formik.errors.modelo ? (
                        <div role="alert">
                          <p className="text-danger">{formik.errors.modelo} </p>
                        </div>
                      ) : null}
                    </Col>
                    <Col className="" md="2">
                      <label></label>

                      <Dropdown
                        isOpen={dropdownOpenModelo}
                        toggle={toggleDropModelo}
                      >
                        <DropdownToggle>Seleccione</DropdownToggle>
                        <DropdownMenu
                          modifiers={{
                            setMaxHeight: {
                              enabled: true,
                              order: 890,
                              fn: (data) => {
                                return {
                                  ...data,
                                  styles: {
                                    ...data.styles,
                                    overflow: "auto",
                                    maxHeight: 200,
                                  },
                                };
                              },
                            },
                          }}
                        >
                          {itemsModelx}
                        </DropdownMenu>
                      </Dropdown>
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
                        autoComplete="off"
                      />
                      {formik.touched.placa && formik.errors.placa ? (
                        <div role="alert">
                          <p className="text-danger">{formik.errors.placa} </p>
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
                        type="number"
                        inputMode="numeric"
                        onBlur={formik.handleBlur}
                        style={{ appearance: "textfield" }}
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
                      <label>Kilometraje del vehículo</label>
                      <Input
                        cols="80"
                        placeholder="Ingrese el kilometraje del vehículo"
                        rows="4"
                        type="text"
                        id="kilometraje"
                        name="kilometraje"
                        value={formik.values.kilometraje}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.kilometraje &&
                        formik.errors.kilometraje ? (
                        <div role="alert">
                          <p className="text-danger">
                            {formik.errors.kilometraje}{" "}
                          </p>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <label>Seleccione el tipo de vehiculo</label>
                      <FormGroup
                        check
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <Label check>
                          <Input
                            type="radio"
                            name="tipoVehiculo"
                            value="AUTO"
                          />{" "}
                          Auto
                        </Label>
                        <Label check>
                          <Input
                            type="radio"
                            name="tipoVehiculo"
                            value="CAMIONETA"
                          />{" "}
                          Camioneta
                        </Label>
                      </FormGroup>
                      {formik.touched.tipoVehiculo &&
                        formik.errors.tipoVehiculo ? (
                        <div role="alert">
                          <p className="text-danger">
                            {formik.errors.tipoVehiculo}{" "}
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
