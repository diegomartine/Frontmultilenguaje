import DataTable, { createTheme } from "react-data-table-component";
import "styled-components";
import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";

const Produc = () => {
  const { t, i18n } = useTranslation();
  const [Produc, setProduc] = useState([]);
  const [ref, setref] = useState({});
  const [name, setname] = useState([]);
  const [descript, setdescript] = useState([]);
  const [price, setprice] = useState([]);
  const [taxes, settaxes] = useState([]);
  const [id, setId] = useState("");
  const URL = "http://localhost:8080/articulos";
  const URL2 = "http://localhost:8080/articulos";
  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setProduc(data);
  };
  useEffect(() => {
    showData();
  }, []);

  const info = async (id) => {
    const response = await fetch(`${URL2}/${id}`);
    const data = await response.json();
    setref(data);
    console.log(data);
    setId(id);
    setref(data.ref);
    setname(data.nombre);
    setdescript(data.descript);
    setprice(data.precio);
    settaxes(data.taxes);
    console.log(id);
  };

  // const editRef = async (value, campo) => {
  //   setTimeout(() => {
  //   let actual = ref;
  //   console.log(actual)
  //   let old = ref;
  //   actual[campo] = value;
  //   setref({ descrip: "", name:"", price:"", ref:"", taxes:"" });
  //   setTimeout(() => {
  //     setref(old);
  //     setref(actual);
  //   }, 0.5);
  // }, 0.5);
  // };

  const edit = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ref: ref,
        nombre: name,
        descript: descript,
        precio: price,
        taxes: taxes,
      }),
    };
    fetch(`${URL2}/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      window.location.reload(true);
     
    });
};

  const columns = [
    {
      name: "Referencia",
      selector: (row) => row.ref,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
    },

    {
      name: "Precio sin impuesto",
      selector: (row) => row.precio,
    },
    {
      name: "Editar",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-dark btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => info(row.id)}
        >
          <i class="bi bi-pencil-square"></i>
        </button>
      ),
    },

    {
      name: "Info",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-dark btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          onClick={() => info(row.id)}
        >
          <i class="bi bi-info"></i>
        </button>
      ),
    },
  ];

  createTheme(
    "custom",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {t("info")}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("referencia")}
                </label>
                <input
                  value={ref}
                  disabled
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("nombre")}
                </label>
                <input
                  value={name}
                  disabled
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("descripción")}
                </label>
                <input
                  value={descript}
                  disabled
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("precioi")}
                </label>
                <input
                  value={price}
                  disabled
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("impuestoa")}
                </label>
                <input
                  value={taxes}
                  disabled
                  type="number"
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary "
                data-bs-dismiss="modal"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {t("edit")}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("referencia")}
                </label>
                <input
                  value={ref}
                  type="text"
                  className="form-control "
                  onChange={(e) => setref(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("nombre")}
                </label>
                <input
                  value={name}
                  type="text"
                  className="form-control"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("descripción")}
                </label>
                <input
                  value={descript}
                  type="text"
                  className="form-control"
                  onChange={(e) => setdescript(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("precioi")}
                </label>
                <input
                  value={price}
                  type="number"
                  className="form-control"
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("impuestoa")}
                </label>
                <input
                  value={taxes}
                  type="number"
                  className="form-control"
                  onChange={(e) => settaxes(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => edit()}
                type="button"
                className=" btn btn-primary"
              >
                {t("guardar")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="crear nav-link"
                  href="javascript:history.back(-1);"
                >
                  {t("Volver")}
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  {t("Productos")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pedidos">
                  {t("Pedidos")}
                </Link>
              </li>
              <li className="nav-item">
                <button className="  btn btn-primary me-md-2" type="button">
                  <Link className="crear " to="/newproduc">
                    {t("Newproducto")}
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-grid gap-4 d-md-flex justify-content-md-end pb-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => i18n.changeLanguage("es")}
            disabled={i18n.language === "es"}
          >
            {t("Español")}
          </button>
          <button
            type="button"
            className="btn btn-primary ml-2"
            onClick={() => i18n.changeLanguage("en")}
            disabled={i18n.language === "en"}
          >
            {t("Ingles")}
          </button>
        </div>
      </nav>

      <DataTable columns={columns} data={Produc} pagination theme="custom" />
    </div>
  );
};
export default Produc;
window.onhashchange = function () {
  window.history.pushState("", document.title, window.location.pathname);
};
