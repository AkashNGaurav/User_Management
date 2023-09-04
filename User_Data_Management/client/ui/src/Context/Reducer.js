import {LOGINUSERDETAILS, SignUpUserDetails, USER_DETAILS, FILTERS, SEARCH, DRILLDOWNGRAPH} from '../Constants/ActionConstants';

export const reducer = (state, action) => {
    if(action.type === LOGINUSERDETAILS){
        return {...state, email:action?.payload?.email, password:action?.payload?.password}
    }else if(action.type === SignUpUserDetails){
        return {...state, name:action?.payload?.name, dob:action?.payload?.dob, gender:action?.payload?.gender, phoneNumber:action?.payload?.phoneNumber, email:action?.payload?.email, password:action?.payload?.confirmPassword, address:action?.payload?.address, country:action?.payload?.country, state:action?.payload?.state, qualification:action?.payload?.qualification, profile:action?.payload?.profile, department:action?.payload?.department, securityQuestion: action?.payload?.securityQuestion, securityAns: action?.payload?.securityAns}
    }else if(action.type === USER_DETAILS){
        return {...state, data:action?.payload?.data, filteredUsers: action?.payload?.filteredUsers}
    }else if(action.type === FILTERS){
        return {...state, timeframe:action?.payload?.timeframe, location:action?.payload?.location}
    }else if(action.type === SEARCH){
        return {...state, data:action?.payload?.data, showUserProfile:action?.payload?.showUserProfile}
    }else if(action.type === DRILLDOWNGRAPH){
        return {...state, locationBarGraphFilter:action?.payload?.locationBarGraphFilter, showCountryGraph:action?.payload?.showCountryGraph}
    }else{
        return state;
    }
}