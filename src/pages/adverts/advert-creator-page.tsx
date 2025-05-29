import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import "../../styles/form.css";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { createAdvert, getTags } from "./service";

function AdvertCreator() {
  const navigate = useNavigate();

  const [advert, setAdvert] = useState<{
    name: string;
    price: string;
    sale: boolean;
    tags: string[];
    photo: File | null;
  }>({
    name: "",
    price: "",
    sale: true,
    tags: [],
    photo: null,
  });

  const { name, price, sale, tags, photo } = advert;
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [error, setError] = useState<{ message: string } | null>(null);
  const disabled = !name || !price || !tags.length || isFetching;

  useEffect(() => {
    async function fetchTags() {
      try {
        const tags = await getTags();
        setAvailableTags(tags);
      } catch (error) {
        if (error instanceof AxiosError) {
        setError({ message: error.response?.data?.message });
      }
      }
    }
    fetchTags();
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const target = event.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    if (type === "checkbox" && name === "tags") {
      setAdvert((prev) => ({
        ...prev,
        tags: checked
          ? [...prev.tags, value]
          : prev.tags.filter((tag) => tag !== value),
      }));
    } else if (type === "radio" && name === "sale") {
      setAdvert((prev) => ({
        ...prev,
        sale: value === "true",
      }));
    } else {
      setAdvert((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setAdvert((prev) => ({ ...prev, photo: file }));
    } else {
      setAdvert((prev) => ({ ...prev, photo: null }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsFetching(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("sale", sale.toString());
      tags.forEach((tag) => formData.append("tags", tag));
      if (photo) {
        formData.append("photo", photo);
      }

      await createAdvert(formData);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({ message: error.response?.data?.message });
      }
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="main-container">
      <div className="creator-page">
        <h2>Crea tu anuncio</h2>

        <form onSubmit={handleSubmit}>
          <label className="manual-label">
            * Nombre o descripción
            <input
              className="manual"
              type="text"
              maxLength={90}
              minLength={3}
              placeholder="Máx. 90 caracteres"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </label>
          <label className="manual-label">
            * Precio
            <input
              className="manual"
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </label>

          <fieldset className="fieldset">
            <legend>* Compraventa</legend>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="sale"
                  value="true"
                  checked={sale === true}
                  onChange={handleChange}
                />
                Compra
              </label>
              <label>
                <input
                  type="radio"
                  name="sale"
                  value="false"
                  checked={sale === false}
                  onChange={handleChange}
                />
                Venta
              </label>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend>* Tags</legend>
            <div className="radio-group">
              {availableTags.map((tag) => (
                <label key={tag}>
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag}
                    checked={tags.includes(tag)}
                    onChange={handleChange}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="file-upload">
            <label className="manual-label">Añade una imagen</label>
            <input
              className="input-file"
              type="file"
              accept="image/*"
              name="file"
              onChange={handlePhotoChange}
            />
          </div>

          <button type="submit" disabled={disabled}>
            Crear
          </button>
        </form>
        {error && (
          <div
            className="form-error"
            role="alert"
            onClick={() => {
              setError(null);
            }}
          >
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvertCreator;
