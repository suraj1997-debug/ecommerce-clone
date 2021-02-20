import React from 'react';
import Layout from '../../components/Layout';
import getParams from '../../utilities/getParams';
import ClothingAndAccessories from './ClothingAndAccessories';
import ProductPage from './ProductPage';
import ProductStore from './ProductStore';
import './style.css';



function ProductListPage(props) {



    const renderProduct = () =>{
        const params = getParams(props.location.search);
        console.log(params);
        let content = null;
        switch(params.type){
            case 'Store':
                content = <ProductStore  {...props} />;
                break;
            case 'page':
                content = <ProductPage {...props} />;
                break;
            default:
                content = <ClothingAndAccessories {...props} />;
        }
        return content;
    }

   return(
        <Layout>
            {renderProduct()}
        </Layout>
    );
}

export default ProductListPage;