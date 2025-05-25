import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import type { Advert } from "./types";
import { logout } from "../auth/service";

interface AdvertsPageProps {
  onLogout: () => void;
}

function AdvertsPage({ onLogout }: AdvertsPageProps) {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    getLatestAdverts().then((adverts) => {
      setAdverts(adverts);
    });
  }, []);

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <div className="adverts-page">
      <h1>Adverts Page</h1>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>{advert.content}</li>
        ))}
      </ul>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default AdvertsPage;
