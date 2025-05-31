import type { Advert } from "./types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, sale, price, tags, photo } = advert;
  const defaultPhoto = "/vite.svg";
  const imageSrc = photo || defaultPhoto;

  return (
    <div className="advert-item-detail">
      <img src={imageSrc} alt={name} className="advert-photo" />
      <h3 className="advert-name">{name}</h3>
      <p className="advert-sale">
        {sale ? "Venta" : "Compra"} - {price} €
      </p>
      <p className="advert-tags">{tags.join(", ")}</p>
    </div>
  );
};

export default AdvertItem;
