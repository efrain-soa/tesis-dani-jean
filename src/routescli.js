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

//Cliente
import Formulario from "views/Formulario";
import Citas from "views/Citas";

var routes = [
  {
    path: "/formulario",
    name: "Formulario",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Formulario,
    layout: "/cliente",
  },
  {
    path: "/citas",
    name: "Registro de Citas",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Citas,
    layout: "/cliente",
  },
];
export default routes;
