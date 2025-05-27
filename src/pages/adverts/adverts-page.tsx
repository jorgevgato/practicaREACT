import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import type { Advert } from "./types";
import Page from "../../components/layout/page";

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
      <div className="adverts-page">
        {adverts.length ? (
          <ul>
            {adverts.map((advert) => (
              <li key={advert.id}>
                {advert.name} {advert.price} €. Tagged: {advert.tags}{" "}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
