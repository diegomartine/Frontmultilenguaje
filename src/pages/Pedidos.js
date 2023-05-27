import DataTable, { createTheme } from "react-data-table-component";
import "styled-components";
import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";

const Pedidos = () => {
  const { t, i18n } = useTranslation();
  const [Produc, setProduc] = useState([]);
  const [Produc2, setProduc2] = useState([]);
  const [Produc3, setProduc3] = useState([]);
  const [id, setId] = useState("");
  const [valor, setvalor] = useState("");
  const [total, settotal] = useState("");
  const [rows, setRow] = useState([]);
  const URL = "http://localhost:8080/pedidos";
  const URL1 = "http://localhost:8080/articulos";
  const URL2 = "http://localhost:8080/pedidos";
  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setProduc(data);
  };
  const showData2 = async () => {
    const response = await fetch(URL1);
    const data = await response.json();
    setProduc2(data);
  };
  useEffect(() => {
    showData();
    showData2();
    info(1);
  }, []);

  async function deleteProd(i) {
    let actual = rows;

    actual.splice(i, 1);

    setRow([]);

    setTimeout(async () => {
      setRow(actual);
    }, 1);
  }
  async function addProduct() {
    let i = rows.length;
    let nom = "prod" + i;
    let actual = rows;
    let prod = {
      ref: "",
      product: "",
      cant: 0,
      valor: "",
      tax: "",
      valsintax: "",
      total: "",
    };
    actual.push(prod);

    setRow([]);

    setTimeout(async () => {
      setRow(actual);
      setTimeout(() => {
        let input = document.getElementById(nom);
        if (input != null) {
          document.getElementById(nom).focus();
        }
      }, 3);
    }, 1);
  }
  async function selectProduct(valor, i) {
    let actual = rows;
    let nom = "prod" + i;

    actual[i].product = Number(valor);
    actual[i].ref = Produc[valor].ref;
    actual[i].valor =
      Number(Produc[valor].precio) + Produc[valor].precio * Produc[valor].taxes;
    actual[i].tax = Produc[valor].taxes;
    actual[i].valsintax = Number(Produc[valor].precio);

    setRow([]);

    setTimeout(async () => {
      setRow(actual);
      setTimeout(() => {
        console.log(document.getElementById(nom));
        document.getElementById(nom).focus();
      }, 3);
    }, 1);
  }
  async function setCantidad(valor, i) {
    let actual = rows;
    // let nom = "cant" + i;

    actual[i].cant = Number(valor);
    let total = 0;
    let subTotal = 0;
    for (let i = 0; i < actual.length; i++) {
      total = Number(total) + Number(actual[i].valor * valor);
      subTotal = Number(subTotal) + Number(actual[i].valsintax * valor);
    }

    settotal(total);
    setvalor(subTotal);

    setRow([]);

    setTimeout(async () => {
      setRow(actual);
      let nom = "cant" + i;
      setTimeout(() => {
        document.getElementById(nom).focus();
      }, 3);
    }, 1);

    console.log(rows);
  }

  const columns = [
    {
      name: "Identificador",
      selector: (row) => row.id,
    },
    {
      name: "Precio total",
      selector: (row) => row.precio,
    },

    {
      name: "Precio total con impuesto",
      selector: (row) => row.total,
    },
    // {
    //   name: "Editar",
    //   button: true,
    //   cell: (row) => (
    //     <button
    //       className="btn btn-dark btn btn-primary"
    //       type="button"
    //       data-bs-toggle="modal"
    //       data-bs-target="#exampleModal1"
    //       onClick={() => info(row.id)}
    //     >
    //       <i class="bi bi-pencil-square"></i>
    //     </button>
    //   ),
    // },

    {
      name: "Info",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-dark btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
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

  const info = async (id) => {
    const response = await fetch(`${URL2}/${id}`);
    const data = await response.json();
    setProduc3(data.products);
    settotal(data.total);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabindex="-1"
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
            <div className="modal-body">
              <div className="mb-3">
                <span>SubTotal: {valor}</span>
                <span>Total: {total}</span>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("Productos")}
                </label>
                <table className="w-100 table table-striped">
                  <thead>
                    <th>{t("Producto")}</th>
                    <th>{t("referencia")}</th>
                    <th>{t("canti")}</th>
                    <th>{t("pre")}</th>
                    <th>{t("total")}</th>
                    <th>{t("delet")}</th>
                  </thead>
                  <tbody id="tablebody">
                    {rows.map((value, i) => {
                      return (
                        <tr>
                          <td>
                            <select
                              id={"prod" + i}
                              className="form-control"
                              disabled
                              value={value.product}
                              onChange={(e) => selectProduct(e.target.value, i)}
                            >
                              <option value="" disabled>
                                {t("select")}
                              </option>
                              {Produc.map((val, n) => {
                                return <option value={n}>{val.nombre}</option>;
                              })}
                            </select>
                          </td>
                          <td>{value.ref}</td>
                          <td>
                            <input
                              disabled
                              id={"cant" + i}
                              type="number"
                              className="form-control"
                              value={value.cant}
                              onChange={(e) => setCantidad(e.target.value, i)}
                              defaultValue={value.cant}
                            />
                          </td>
                          <td disabled>{value.valor}</td>
                          <td disabled>
                            {(value.total = value.cant * value.valor)}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger center"
                              onClick={() => {
                                deleteProd(i);
                              }}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan="6" className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary center"
                          onClick={addProduct}
                        >
                          {t("add")}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                {t("guardar")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
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
        tabindex="-1"
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
            <div className="modal-body">
              <div className="mb-3">
                <table className="w-100 table table-striped">
                  <thead>
                    <th>{t("referencia")}</th>
                    <th>{t("canti")}</th>
                    <th>{t("totalpedido")}</th>
                  </thead>
                  <tbody id="tablebody">
                    {Produc3.map((value, i) => {
                      return (
                        <tr>
                          <td>{value.ref}</td>
                          <td>
                            <input
                              disabled
                              id={"cant" + i}
                              type="number"
                              className="form-control"
                              value={value.cant}
                              defaultValue={value.cant}
                            />
                          </td>
                          <td disabled>
                            {(total )}
                            </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {t("close")}
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
                  <Link className="crear " to="/newPedido">
                    {t("Newpedidos")}
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
      <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-2"></div>
      <DataTable columns={columns} data={Produc} pagination theme="custom" />
    </div>
  );
};
export default Pedidos;
