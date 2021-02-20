
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
                children:[]
            }
        ];
    }

    for(let cat of categories){
        if(cat._id == parentid){
            MyCategories.push({
                ...cat,
                children:cat.children  ? buildNewCategories(parentid,[...cat.children,{
                    _id:category._id,
                    slug:category.slug,
                    name:category.name,
                    parentid:category.parentid,
                    children:category.children
                }],category): []
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
        case categoryConstant.GET_CATEGORY_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
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
            loading:false
        }
        break;            
    }

    return state;
}

export default CategoryReducer;