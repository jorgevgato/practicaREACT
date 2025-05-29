import type { Advert } from "./types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, sale, price, tags, photo } = advert;

  return (
    <div className="advert-item-detail">
      {photo && (
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${photo}`}
          alt={name}
          className="advert-photo"
        />
      )}
      <h3 className="advert-name">{name}</h3>
      <p className="advert-sale">
        {sale ? "Compra" : "Venta"} - {price} €
      </p>
      <p className="advert-tags">{tags.join(", ")}</p>
    </div>
  );
};

export default AdvertItem;
