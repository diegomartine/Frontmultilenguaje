import "styled-components";
import "../App.css";
import { Link } from "react-router-dom";
import "../i18n";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


const NewProduc = () => {
  const [ setPostId ] = useState(null);
  
  useEffect(() => {


}, []);

  const { t, i18n } = useTranslation();
  
  const [ref, setref] = useState("");
  const [nombre, setnombre] = useState("");
  const [descript, setdescript] = useState("");
  const [precio, setprecio] = useState("");
  const [taxes, settaxes] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/articulos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
       },
        body: JSON.stringify({
          ref: ref,
          nombre: nombre,
          descript: descript,
          precio: precio,
          taxes: taxes,
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setref("");
        setnombre("");
        setdescript("");
        setprecio("");
        settaxes("");
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="crear nav-link"
                  href="javascript:history.back(-1);"
                >
                  {" "}
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
      <div className="container pb-5">
        <div>
          <h2 className="text-center pt-5"> {t("Createprodu")}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              {t("referencia")}
            </label>
            <input
              type="text"
              className="form-control"
              value={ref}
              onChange={(e) => setref(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              {t("nombre")}
            </label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setnombre(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              {t("descripción")}
            </label>
            <input
              type="text"
              className="form-control"
              value={descript}
              onChange={(e) => setdescript(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              {t("precioi")}
            </label>
            <input
              type="number"
              className="form-control"
              value={precio}
              onChange={(e) => setprecio(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              {t("impuestoa")}
            </label>
            <input
              type="number"
              className="form-control"
              value={taxes}
              onChange={(e) => settaxes(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {t("enviar")}
          </button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    </div>
  );
};
export default NewProduc;
