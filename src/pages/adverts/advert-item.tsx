import type { Advert } from "./types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, sale, price, tags, photo } = advert;
  return (
    <div>
      <span>{photo}</span>
      <span>{name}</span>
      <span>{price} €</span>
      <span>{sale}</span>
      <span>{tags}</span>
    </div>
  );
};

export default AdvertItem;
