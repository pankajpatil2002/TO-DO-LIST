// Import necessary modules and components
import React, { useState, useContext } from "react";
import * as S from "./styles"; // Import styled components
import Logo from "../../Img/Logo.png"; // Import logo image
import { Link } from "react-router-dom"; // Import Link component for routing
import AuthContext, { AuthType } from "../../Contexts/authContext"; // Import AuthContext and AuthType from context file

// Define Login component as a functional component
const Login: React.FC = () => {
    // Destructure setUserData from AuthContext
    const { setUserData } = useContext(AuthContext) as AuthType;
    // Declare state variable email and its setter function setEmail
    const [email, setEmail] = useState("");

    // Function to handle login
    function handleLogin() {
        // Store email in localStorage
        localStorage.setItem('@Project:email', email);
        // Set user data using setUserData
        setUserData({ email });
    }

    // Function to handle email input change
    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        // Update email state with the input value
        setEmail(event.target.value);
    }

    // Return JSX for Login component
    return (
        <S.Page>
            {/* Left side of the page containing the logo */}
            <S.LeftSide>
                <S.Img src={Logo}></S.Img>
            </S.LeftSide>
            {/* Right side of the page containing login form */}
            <S.RightSide>
                {/* Title and subtitle */}
                <S.Title>Welcome to Tasker</S.Title>
                <S.Subtitle>Please, insert your information to access your tasks.</S.Subtitle>
                {/* Email input field */}
                <S.FieldName>Email</S.FieldName>
                <S.InputField value={email} id="email" onChange={handleEmail} placeholder="Insert your email"></S.InputField>
                {/* Password input field */}
                <S.FieldName>Password</S.FieldName>
                <S.InputField placeholder="Insert your password" type="password"></S.InputField>
                {/* Checkbox for remembering user */}
                <S.KeepSigned><S.Checkbox /><S.Subtitle>Remember me</S.Subtitle></S.KeepSigned>
                {/* Link to home page */}
                <Link to="/">
                    {/* Sign In button with onClick event */}
                    <S.SignIn onClick={handleLogin}>Sign In</S.SignIn>
                </Link>
                {/* Subtitle with link to sign up */}
                <S.Subtitle>Don't have an account? <a>Sign Up</a></S.Subtitle>
            </S.RightSide>
        </S.Page>
    );
};

// Export Login component as default
export default Login;
