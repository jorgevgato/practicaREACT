import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import type { Advert } from "./types";
import Page from "../../components/layout/page";
import { Link } from "react-router";
import AdvertItem from "./advert-item";
import "../../styles/adverts-page.css";

const EmptyList = () => (
  <div className="tweets-page-empty">
    <p>No hay anuncios disponibles.</p>
  </div>
);

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    getLatestAdverts().then((adverts) => {
      setAdverts(adverts);
    });
  }, []);

  return (
    <Page title="¡Compra, vende, busca y comparte!">
      <div className="ads-container">
        {adverts.length ? (
          adverts.map((advert) => (
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
