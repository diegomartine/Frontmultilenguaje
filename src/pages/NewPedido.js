import "styled-components";
import "../App.css";
import { Link } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";
import  { createTheme } from "react-data-table-component";
import React, { useState, useEffect,  } from "react";

const NewPedido = () => {
  const { t, i18n } = useTranslation();
  const [ref, setref] = useState("");
  const [product, setproduct] = useState("");
  const [valor, setvalor] = useState("");
  const [total, settotal] = useState("");
  const [cant, setcant] = useState("");
  const [message, setMessage] = useState("");
  const [rows, setRow] = useState([]);
  const [Produc, setProduc] = useState([]);
  const URL = "http://localhost:8080/articulos";
  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setProduc(data);
  };
  useEffect(() => {
    showData();
    setRow([
      {
        ref: "",
        product: "",
        cant: 0,
        valor: "",
        tax: "",
        valsintax: "",
        total: "",
      },
    ]);
  }, []);

  async function setCantidad(valor, i) {
    let actual = rows;
    let nom = "cant" + i;

    actual[i].cant = Number(valor);
    let total = 0;
    let subTotal = 0; 
    for (let i = 0; i < actual.length; i++) {
      total = Number(total) + Number(actual[i].valor*valor);
      subTotal = Number(subTotal) + Number(actual[i].valsintax*valor);      
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

  async function deleteProd(i) {
    let actual = rows;

    actual.splice(i, 1);

    setRow([]);

    setTimeout(async () => {
      setRow(actual);
    }, 1);
  }

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

  let handleSubmit2 = async (e) => {
    e.preventDefault();
    var productos = [];
    for (let i = 0; i < rows.length; i++) {
      var info = {
        id: i+1,
        ref: rows[i].ref,
        cant: rows[i].cant
      };

      if(rows[i].cant < 1){
        setMessage("La cantidad debe ser mayor a 0");
        return false;
      }      
      productos.push(info)
    }

    try {
      let res = await fetch("http://localhost:8080/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productos,
          precio: valor,                  
          total: total,
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setRow([]);
        setref("");
        setproduct("");
        setcant("");
        setvalor("");
        settotal("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  className="crear nav-link"
                  href="javascript:history.back(-1);"
                >
                  {t("Volver")}
                </a>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/">
                  {t("Productos")}
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/pedidos">
                  {t("Pedidos")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div class="d-grid gap-4 d-md-flex justify-content-md-end pb-2">
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
      <div className="container pb-5">
        <div>
          <h2 className="text-center pt-5"> {t("Createpedi")}</h2>
        </div>
        <form onSubmit={handleSubmit2}>
          <span>SubTotal: {valor}</span>  
          <span>Total: {total}</span>  
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              {t("Productos")}
            </label>
            {/* <DataTable columns={columns} data={Produc} pagination theme="custom" /> */}
            <table class="w-100 table table-striped">
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
                          class="form-control"
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
                      <td >{value.ref}</td>
                      <td>
                        <input
                          id={"cant" + i}
                          type="number"
                          class="form-control"
                          value={value.cant}
                          onChange={(e) => setCantidad(e.target.value, i)}
                          defaultValue={value.cant}
                        />
                      </td>
                      <td>{value.valor}</td>
                      <td>{(value.total = value.cant * value.valor)}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger center"
                          onClick={() => {
                            deleteProd(i);
                          }}
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="6" class="text-center">
                    <button
                      type="button"
                      class="btn btn-primary center"
                      onClick={addProduct}
                    >
                     {t("add")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>


          </div>
       
          <button type="submit" class="btn btn-primary center ">
            {t("enviar")}
          </button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    </div>
  );
};

export default NewPedido;

window.onhashchange = function () {
  window.history.pushState("", document.title, window.location.pathname);
};