import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.js";
import { listProducts } from "../actions/productActions.js";
import Loading from "../components/Loading.js";
import Message from "../components/Message.js";
import { useParams } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch,keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={4} lg={3} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomePage;
