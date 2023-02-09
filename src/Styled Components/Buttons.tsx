import styled from "styled-components";

const Button = styled.button`
  background-color: #4a57a2;
  border: none;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3a4782;
  }
  &:active {
    background-color: #2a3872;
  }
  &:focus {
    outline: none;
  }
`;
export default Button;
