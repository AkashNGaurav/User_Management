import React, { createContext, useEffect, useReducer} from "react";
import { filtersInitialState, loginDetailsInitialState, searchInitialState, signupDetailsInitialState, userDetailsInitialState, drilldownGraphInitialState } from "./InitialStates";
import { reducer } from "./Reducer";
import { GetUsers } from "../Services/ApiServices";
import { USER_DETAILS, SEARCH, FILTERS, DRILLDOWNGRAPH, LOGINUSERDETAILS } from "../Constants/ActionConstants";

export const LoginContext = createContext({});

export const SignUpContext = createContext({});

export const UsersDetailsContext = createContext();

export const FiltersContext = createContext();

export const SearchContext = createContext();

export const DrillDownGraphContext = createContext();

export const LoginProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, loginDetailsInitialState);

    return(
        <LoginContext.Provider value={{state,dispatch}}>
            {children}
        </LoginContext.Provider>
    )
};

export const SignUpProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer, signupDetailsInitialState);

    return (
        <SignUpContext.Provider value={{state,dispatch}}>
            {children}
        </SignUpContext.Provider>
    )
}

export const UserDetailsProvider = ({children}) => {
    const payload = {
        accessToken : localStorage?.getItem("access_token"),
    }

    console.log(payload)
    const [state, dispatch] = useReducer(reducer, userDetailsInitialState);
    
    const updatedUserData = (val) => {
        dispatch({type: USER_DETAILS, payload: val});
    }

    useEffect(()=>{
        try{
            const fetchData = async () => {
                const res = await GetUsers(payload);
                if(res?.status === 200){
                    dispatch({type: USER_DETAILS, payload: res})
                }
            }
            fetchData();
        }catch(error){
            console.log("An error occurred ===> ", error);
        }
    },[])

    return (
        <UsersDetailsContext.Provider value={{state, updatedUserData}}>
            {children}
        </UsersDetailsContext.Provider>
    )
}

export const FiltersProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, filtersInitialState);

    const updatedFilters = (val) => {
        dispatch({type: FILTERS, payload: val});
    }

    
    return (
        <FiltersContext.Provider value={{state, updatedFilters, }}>
            {children}
        </FiltersContext.Provider>
    )
}

export const SearchProvider = ({children}) => {
    const [searchState, dispatch] = useReducer(reducer, searchInitialState);

    const searchedValue = (val) => {
        dispatch({type: SEARCH, payload: val});
    }

    return (
        <SearchContext.Provider value={{searchState, searchedValue}}>
            {children}
        </SearchContext.Provider>
    )
}

export const DrillDownGraphProvider = ({children}) => {
    const [drillDownState, dispatch] = useReducer(reducer, drilldownGraphInitialState);

    const locationBarGraphFilterHandler = (val) =>{
        dispatch({type: DRILLDOWNGRAPH, payload: val})
    }

    return (
        <DrillDownGraphContext.Provider value={{drillDownState, locationBarGraphFilterHandler}}>
            {children}
        </DrillDownGraphContext.Provider>
    )
}