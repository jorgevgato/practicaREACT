import "../../styles/form.css";

function AdvertCreator() {
  /** const [fields, setFields] = useState({
    name: "",
    sale: "",
    price: "",
    tags: "",
    photo: "",
  }) */

  return (
    <div className="main-container">
      <div className="creator-page">
        <h2>Crea tu anuncio</h2>
        <form>
          <label className="manual-label">
            Nombre o descripción de tu producto
            <input className="manual" type="text" name="name" />
          </label>
          <label className="manual-label">
            Precio
            <input className="manual" type="number" name="price" />
          </label>
          <fieldset className="fieldset">
            <legend>Compraventa</legend>
            <div className="radio-group">
              <label>Compra</label>
              <input type="radio" name="buySell" value="buy" />
              <label>Venta</label>
              <input type="radio" name="buySell" value="sell" />
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend>Tags</legend>
            <div className="radio-group">
              <label>lifestyle</label>
              <input type="radio" name="lifestyle" />
              <label>mobile</label>
              <input type="radio" name="mobile" />
              <label>motor</label>
              <input type="radio" name="motor" />
              <label>work</label>
              <input type="radio" name="work" />
            </div>
          </fieldset>

          <button type="submit">Crear</button>
        </form>
      </div>
    </div>
  );
}

export default AdvertCreator;
