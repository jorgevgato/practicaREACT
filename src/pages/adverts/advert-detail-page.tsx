import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect, useState } from "react";
/* import type { Advert } from "./types"; */
import { deleteAdvert, getAdvertDetail } from "./service";
import { AxiosError } from "axios";
import AdvertItem from "./advert-item";
import "../../styles/advert-detail.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { getDetail } from "../../store/selectors";
import { advertDeleted, detailLoaded } from "../../store/action";

function AdvertDetail() {
  const params = useParams();
  /* const [advert, setAdvert] = useState<Advert | null>(null); */
  const dispatch = useAppDispatch();
  const detail = useAppSelector(getDetail);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    getAdvertDetail(params.advertId)
      .then((detail) => dispatch(detailLoaded(detail)))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            navigate("/404", { replace: true });
          }
        }
      });
  }, [params.advertId, dispatch, navigate]);

  const confirmDelete = async () => {
    if (!detail) return;

    try {
      await deleteAdvert(detail.id);
      dispatch(advertDeleted(detail.id))
      navigate("/"), { replace: true };
    } catch (error) {
      console.error("Error al borrar el anuncio", error);
      window.alert("Error intentando borrar el anuncio.");
    }
  };

  return (
    <Page title="">
      {detail ? (
        <div className="advert-detail-page">
          <div className="ad-container">
            {" "}
            <AdvertItem advert={detail} />{" "}
            <button
              className="delete-button"
              onClick={() => setShowConfirm(true)}
            >
              Borrar
            </button>
            {showConfirm && (
              <div className="modal-backdrop">
                <div className="modal">
                  <p>¿Estás seguro de que quieres borrar este anuncio?</p>
                  <div className="modal-buttons">
                    <button onClick={confirmDelete}>Sí, borrar</button>
                    <button
                      className="cancel"
                      onClick={() => setShowConfirm(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </Page>
  );
}

export default AdvertDetail;
