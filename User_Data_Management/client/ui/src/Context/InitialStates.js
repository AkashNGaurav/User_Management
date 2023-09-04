export const loginDetailsInitialState = {
    email : '',
    password: '',
}

export const signupDetailsInitialState = {
    name : '',
    dob: '',
    gender: '',
    phoneNumber: '',
    email: '',
    password: '',
    address: '',
    country: '',
    state: '',
    qualification: '',
    profile: '',
    department: '',
    securityQuestion: '',
    securityAnswer: '',
}

export const userDetailsInitialState = {
    data : [],
    filteredUsers: [],
}

export const filtersInitialState = {
    timeframe : '1000000',
    location : 'All',
}

export const searchInitialState = {
    data: '',
    showUserProfile: false,
}

export const drilldownGraphInitialState = {
    locationBarGraphFilter: '',
    showCountryGraph: true,
}