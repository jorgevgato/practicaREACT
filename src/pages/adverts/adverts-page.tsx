import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import type { Advert } from "./types";
import Layout from "../../components/layout/layout";

interface AdvertsPageProps {
  isLogged: boolean
  onLogout: () => void;
}

function AdvertsPage({ ...rest }: AdvertsPageProps) {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    getLatestAdverts().then((adverts) => {
      setAdverts(adverts);
    });
  }, []);

  return (
    <Layout title="¡Compra, vende, busca y comparte!" {...rest}>
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
