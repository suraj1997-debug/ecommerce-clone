import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/store';
import { urlgenerate } from '../../../urlConfig';
import {Link}  from 'react-router-dom';
import Card from '../../../components/UI/Card';
import {MaterialButton} from '../../../components/MaterialUI';
import Price from "../../../components/UI/Price";
import Rating from "../../../components/UI/Rating";


function ProductStore(props) {


    const product = useSelector(state => state.product);

    const priceRange = product.priceRange;

    const dispatch = useDispatch();
    useEffect(() => {
        const { match } = props;
        dispatch(getProduct(match.params.slug));

    }, [])
    return (
        <>
            {Object.keys(product.productPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#000",
                  }}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img src={urlgenerate(product.productPictures[0].img)} alt="" />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "10px 0" }}>{product.name}</div>
                    <div>
                      <Rating value="4.3" />
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "#777",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        (3353)
                      </span>
                    </div>
                    <Price value={product.price} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
        </>
    );
}

export default ProductStore;