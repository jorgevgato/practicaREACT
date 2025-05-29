import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect, useState } from "react";
import type { Advert } from "./types";
import { getAdvertDetail } from "./service";
import { AxiosError } from "axios";
import AdvertItem from "./advert-item";
import "../../styles/advert-detail.css";

function AdvertDetail() {
  const params = useParams();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    getAdvertDetail(params.advertId)
      .then((advert) => setAdvert(advert))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            navigate("/404", { replace: true });
          }
        }
      });
  }, [params.advertId, navigate]);

  return (
    <Page title="Detalle">
      {advert ? (
        <div className="advert-detail-page">
          <div className="ad-container">
            {" "}
            <AdvertItem advert={advert} />{" "}
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </Page>
  );
}

export default AdvertDetail;
