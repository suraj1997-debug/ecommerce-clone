import {productConstant} from '../action/constants';

const initialState = {
products:[],
loading:false,
error:null
}


const AddNewProducts=(products,product)=>{
    let MyProducts = [];

    if(products.length > 0){
        for(let pro of products){
            MyProducts.push({
                ...pro,
                product
            })

        }
    }else{
        MyProducts.push(product)
    }
 
 return MyProducts;
}

const productReducer = (state = initialState,action) =>{
    switch(action.type){
        case productConstant.GET_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.products
            }
            break;
        case productConstant.ADD_PRODUCT_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case productConstant.ADD_PRODUCT_SUCCESS:
            const product = action.payload.product;
            let productDetails = AddNewProducts(state.products,product);
            state={
                ...state,
                 products: productDetails,
                loading:false
            }
            break;
        case productConstant.ADD_PRODUCT_FAILURE:
            state={
                ...initialState,
                loading:false
            }
            break;
    }
    return state;
}

export default productReducer;