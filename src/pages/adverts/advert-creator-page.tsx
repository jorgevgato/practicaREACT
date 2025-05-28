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
              <label>
                <input type="radio" name="buySell" value="buy" />
                Compra
              </label>
              <label>
                <input type="radio" name="buySell" value="sell" />
                Venta
              </label>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend>Tags</legend>
            <div className="radio-group">
              <label>
                <input type="radio" name="lifestyle" />
                lifestyle
              </label>
              <label>
                <input type="radio" name="mobile" />
                mobile
              </label>
              <label>
                <input type="radio" name="motor" />
                motor
              </label>
              <label>
                <input type="radio" name="work" />
                work
              </label>
            </div>
          </fieldset>
          <div className="file-upload">
            <label className="manual-label">Añade una imagen</label>
            <input className="input-file" type="file" name="file" />
          </div>

          <button type="submit">Crear</button>
        </form>
      </div>
    </div>
  );
}

export default AdvertCreator;
