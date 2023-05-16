import React from "react";
import "./ReviewItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { img, name, price, _id, quantity } = product;
  return (
    <div className="border-solid flex items-center border-2 rounded-lg bg-slate-300 ">
      <img src={img} alt="product Image" className="w-20 m-2 rounded-lg" />
      <div className="reviewDetails">
        <p className="text-xl">{name}</p>
        <p>
          Price <span className="text-orange-600">${price}</span>
        </p>
        <p>
          Order Quantity: <span className="text-orange-600">{quantity}</span>
        </p>
      </div>
      <button
        onClick={() => handleRemoveFromCart(_id)}
        className="delete-btn text-red-500"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItem;
