import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import type { Advert } from "./types";
import Layout from "../../components/layout/layout";

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
    <Layout title="¡Compra, vende, busca y comparte!">
      <div className="adverts-page">
        {adverts.length ? (
          <ul>
            {adverts.map((advert) => (
              <li key={advert.id}>{advert.content}</li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
