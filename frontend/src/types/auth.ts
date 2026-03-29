export interface User {  // this is the logged in user, matches the backend UserResponse schema
  id: number
  email: string
}

export interface AuthResponse { // thi is what the auth/login enpoint returns(the JWT token)
  access_token: string
  token_type: string
}

export interface LoginCredentials { // this is what the login form will send to the backend
  email: string
  password: string
}

export interface RegisterCredentials { // this is what the registration form will send to the backend
  email: string
  password: string
}