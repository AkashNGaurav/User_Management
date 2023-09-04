import axios from "axios";
import * as CONSTANT from "../Constants/APIConstants";

export const Login = async(
    payload = {email: 'test@email.com', password:'TTest@#21'}
) => {
    try{
        const data = {
            "password": payload?.password,
            "email": payload?.email,
        }
        const path = CONSTANT?.BASEURL + CONSTANT?.LOGIN;
        const res = await axios.post(path,data);
        return res; 
    }catch(error){
        console.log("An Error Occurred:: ", error);
    }
}

export const Signup = async(
    payload = {
        name: "test",
        dob : "1997-12-12",
        gender: "male",
        phoneNumber: "987456987",
        email: "test@email.com",
        password: "TTest@@12",
        address: "Dummy Address",
        country: "India",
        state: "Punjab",
        qualification: "MBA",
        profile: "Associate",
        department: "Sales",
        securityQuestion: "",
        securityAns: "",
    }
) => {
    try{
        const data = {
            "username" : payload?.name,
            "date_of_birth" : payload?.dob,
            "gender" : payload?.gender,
            "contact_number" : payload?.phoneNumber,
            "email_id" : payload?.email,
            "password" : payload?.password,
            "city" : payload?.address,
            "country" : payload?.country,
            "state" : payload?.state,
            "qualification" : payload?.qualification,
            "profile" : payload?.profile,
            "department" : payload?.department,
            "security_question" : payload?.securityQuestion,
            "security_answer" : payload?.securityAns,
        }
        const path = CONSTANT?.BASEURL + CONSTANT?.SIGNUP;
        const res = await axios.post(path, data);
        return res;

    }catch(error){
        console.log("An Error Occured:: ", error);
    }
}

export const GetUsers = (payload = {accessToken: ''}) => {
    try{
        const path = CONSTANT?.BASEURL + CONSTANT?.GET_USERS;
        const res = axios.get(path,{
            headers : {
                'Authorization' : `Bearer ${payload?.accessToken}`
            }
        })
        return res;
    }catch(error){
        console.log(error);
    }
}

export const ForgotPasswordAPI = (payload = {email: 'test@email.com'}) => {
    try{
        const data = {
            "email": payload?.email,
        }
        const path = CONSTANT?.BASEURL + CONSTANT?.FORGOT_PASSWORD;
        const res = axios.post(path, data);
        return res;
    }catch(error){
        console.log(error);
    }
}

export const LogoutAPI = (payload = {access_token: ""}) => {
    try{
        console.log("API PAYLOAD:: ", payload);
        const path = CONSTANT?.BASEURL + CONSTANT?.LOGOUT;
        const res = axios.post(path,{}, {
            headers : {
                'Authorization' : `Bearer ${payload?.access_token}`
            }
        })
        return res;
    }catch(error){
        console.log(error);
    }
}

export const PasswordResetAPI = (payload={
    email: 'test@email.com',
    securityQuestion: 'Where do you live?',
    securityAns: 'State',
    password: 'test'
})=>{
    try{
        const data = {
            "password" : payload?.password,
            "security_question" : payload?.securityQuestion,
            "security_answer" : payload?.securityAns,
            "email" : payload?.email,
        }
        const path = CONSTANT?.BASEURL + CONSTANT?.PASSWORD_RESET;
        const res = axios.post(path, data);
        return res;
    }catch(error){
        console.log(error);
    }
}