import axios from "axios";
import React, { useEffect, useState } from "react";
import Api_Card from "./Api_Card";

const Home = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    handleAddProduct();
  }, []);
  const handleAddProduct = async () => {
    await axios
      .get("https://fakestoreapi.com/products/")
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",

          flexWrap: "wrap",
          padding: 20,
          gap: 30,
        }}
      >
        {product.map((e, i) => {
          return (
            <div key={i}>
              <Api_Card title={e.title} desc={e.description} img={e.image} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
