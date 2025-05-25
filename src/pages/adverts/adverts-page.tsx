import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import type { Advert } from "./types";
import Layout from "../../components/layout/layout";

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
        <h1>Adverts Page</h1>
        <ul>
          {adverts.map((advert) => (
            <li key={advert.id}>{advert.content}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default AdvertsPage;
