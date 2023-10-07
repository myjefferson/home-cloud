import api from '../api'

export const signIn = (username, password) => {
    return api.post('/auth/signIn', {
        username,
        password
    })
}

export const signUp = (dataSignUp) => {
    return api.post('/auth/signUp', dataSignUp)
}