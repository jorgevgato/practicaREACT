import { useEffect, useState } from "react";
import { getLatestAdverts, getTags } from "./service";
import type { Advert } from "./types";
import Page from "../../components/layout/page";
import { Link } from "react-router";
import AdvertItem from "./advert-item";
import "../../styles/adverts-page.css";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../store";
import { advertsLoaded, tagsLoaded } from "../../store/action";
import { getAdverts } from "../../store/selectors";

const EmptyList = () => (
  <div className="empty-adverts">
    <p className="no-adverts">No hay anuncios disponibles.</p>
    <p className="try-login">
      Si no has iniciado sesión, <Link to={"/login"}> pulsa aquí</Link>.
    </p>
  </div>
);

function AdvertsPage() {
  /* const [adverts, setAdverts] = useState<Advert[]>([]); */
  const dispatch = useAppDispatch();
  const adverts = useAppSelector(getAdverts);
  const [filteredAdverts, setFilteredAdverts] = useState<Advert[]>([]);
  /* const [availableTags, setAvailableTags] = useState<string[]>([]); */
  const availableTags = useAppSelector((state) => state.tags || []);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  useEffect(() => {
    getLatestAdverts().then((adverts) => {
      /* setAdverts(adverts); */
      dispatch(advertsLoaded(adverts));
    });
  }, [dispatch]);

  /* useEffect(() => {
    async function fetchTags() {
      try {
        const tags = await getTags();
        setAvailableTags(tags);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(
            "Error al obtener tags.",
            error.response?.data?.message,
          );
        }
      }
    }
    fetchTags();
  }, []); */

  useEffect(() => {
    getTags()
      .then((tags) => {
        dispatch(tagsLoaded(tags));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.error(
            "Error al obtener tags.",
            error.response?.data?.message,
          );
        }
      });
  }, [dispatch]);

  useEffect(() => {
    const filtered = adverts.filter((ad) => {
      const matchesType =
        typeFilter === "" ||
        (typeFilter === "buy" && !ad.sale) ||
        (typeFilter === "sell" && ad.sale);

      const matchesTags =
        tagFilters.length === 0 ||
        tagFilters.every((tag) => ad.tags.includes(tag));

      return matchesType && matchesTags;
    });
    setFilteredAdverts(filtered);
  }, [adverts, typeFilter, tagFilters]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(event.target.value);
  };

  const handleTagToggle = (tag: string) => {
    setTagFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <Page title="¡Compra, vende, busca y comparte!">
      <div className="filters-row">
        <select value={typeFilter} onChange={handleTypeChange}>
          <option value="">Todos</option>
          <option value="buy">Compra</option>
          <option value="sell">Venta</option>
        </select>

        <div className="available-tags">
          {availableTags.map((tag: string) => (
            <label className="checkbox-label" key={tag}>
              <input
                type="checkbox"
                value={tag}
                checked={tagFilters.includes(tag)}
                onChange={() => handleTagToggle(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      <div className="ads-container">
        {filteredAdverts.length ? (
          filteredAdverts.map((advert) => (
            <Link
              to={`/adverts/${advert.id}`}
              key={advert.id}
              className="ad-card"
            >
              <AdvertItem advert={advert} />
            </Link>
          ))
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
