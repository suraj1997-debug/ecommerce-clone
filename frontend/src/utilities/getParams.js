export default (query)=>{
    if(query){
        const queryString = query.split("?")[1];
        if(queryString.length > 0){
            const params = queryString.split("&");
            const paramsObj = {};
            params.forEach(params =>{
               const KeyValue = params.split("=");
                paramsObj[KeyValue[0]] = KeyValue[1];
            })
            return  paramsObj;
        }

    }
    return {};
}