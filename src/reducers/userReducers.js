const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_UPDATE_SUCCESS } = require("../constants/userConstants");

function userSigninReducer(state={},action){
    switch (action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
            case USER_SIGNIN_SUCCESS:
                if (action.payload){                  
                    if (action.payload.data){
                        return {loading:false,userInfo:action.payload.data};
                    }else if(action.payload.errors){                      
                        return {loading:false,errors:action.payload.errors};
                    }else{
                        return {loading:false,error:action.payload};
                    }
                }else{
                   
                   return {loading:false,userInfo:action.payload};
                }
               
            case USER_SIGNIN_FAIL:
                return {loading:false,error:action.payload};
            case USER_UPDATE_SUCCESS:               
                return {userInfo:action.payload};
            default:
                return state;
    }
}



export {userSigninReducer}