
import {categoryConstant} from '../action/constants';

const initialState = {
categories:[],
loading:false,
error:null
}



const buildNewCategories = (parentid,categories,category)=>{
    let MyCategories = [];

    if(parentid == undefined){
        return[
            ...categories,
            {
                _id:category._id,
                slug:category.slug,
                name:category.name,
                type:category.type,
                children:[]
            }
        ];
    }

    for(let cat of categories){
        if(cat._id == parentid){
            const newCategory = {
                _id:category._id,
                slug:category.slug,
                name:category.name,
                type:category.type,
                parentid:category.parentid,
                children:[]
            }
            MyCategories.push({
                ...cat,
                children:cat.children.length > 0 ? [...cat.children,newCategory] : [newCategory]
            });
        }
        else{
            MyCategories.push({
                ...cat,
                children:cat.children  ? buildNewCategories(parentid,[...cat.children,{}],category): []
            })
        }
    }
    return MyCategories;
}


const CategoryReducer = (state = initialState,action)=>{
    switch(action.type){
        case categoryConstant.GET_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstant.GET_CATEGORY_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
            }
            break;
        case categoryConstant.GET_CATEGORY_Failure:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        case categoryConstant.ADD_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstant.ADD_CATEGORY_SUCCESS:
            const category = action.payload.category;
            let updatedCategoryList = buildNewCategories(category.parentid,state.categories,category);
            console.log("updatedCategoryList",updatedCategoryList);
            state={
                ...state,
                categories:updatedCategoryList,
                loading:false
                
            }
            break;
        case categoryConstant.ADD_CATEGORY_FAILURE:
            state={
                ...initialState,
                loading:false,
                error:action.payload.error
            }
            break; 
        case categoryConstant.UPDATE_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstant.UPDATE_CATEGORY_SUCCESS:
            state={
                ...state,
                loading:false
            }
            break;
        case categoryConstant.UPDATE_CATEGORY_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        case categoryConstant.DELETE_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
            }
            break; 
        case categoryConstant.DELETE_CATEGORY_SUCCESS:
            state={
                ...state,
                loading:false
            }
            break;
        case categoryConstant.DELETE_CATEGORY_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;   
             
    }

    return state;
}

export default CategoryReducer;