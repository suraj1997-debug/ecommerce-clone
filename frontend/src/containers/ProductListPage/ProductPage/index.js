import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductPage } from '../../../redux/store';
import getParams from '../../../utilities/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';


function ProductPage(props) {

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    const params = getParams(props.location.search);

    const payload = {
        params
    }

    useEffect(() => {
        dispatch(getProductPage(payload));
    }, [])

    const { page } = product;

    return (
        <>
        <div style={{margin:"0px 10px"}}>

            <h3 style={{ fontWeight: "500", fontSize: "18px", margin: "20px 10px" }}>{page.title}</h3>
            <Carousel renderThumbs={() => { }}>
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a key={index} 
                          style={{display:"block"}}
                          href={banner.navigateTo}
                        >
                            <img src={banner.img} alt="" />
                        </a>
                    )
                }

            </Carousel>
            <div style={{ display: 'flex',justifyContent: 'center',flexWrap: 'wrap',margin: '10px 0'}}>
                {
                    page.products && page.products.map((product,index)=>
                    <Card key={index} style={{width: '400px', height: '200px', margin: '5px'}}>
                        <img style={{ width: '100%',height: '100%'}} src={product.img} alt="" />
                    </Card>
                    )
                }
            </div>
        </div>
       </>
    );
}


export default ProductPage;