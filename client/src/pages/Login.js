import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormWrapper = styled.form`
  max-width: 486px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px 12px;
  width: 100%;
  border: 1px solid #009bd6;
  border-radius: 8px;
  margin: 4px 0;
  outline: none;
`;

const Button = styled.button`
  padding: 6px 12px;
  background: #009bd6;
  border: none;
  outline: none;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
`;

const P = styled.p``;

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("accessToken");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = data;

    const obj = {
      email,
      password,
    };

    const newOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    // Doing Request to the server to add job
    fetch("http://localhost:8000/login", newOptions)
      .then((response) => response.json())
      .then((data) => {
        const { accessToken } = data;
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        navigate("/home");
      })
      .catch((err) => {
        window.alert("Wrong Credentials");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <Input
        value={data.email}
        onChange={(e) =>
          setData({
            ...data,
            email: e.target.value,
          })
        }
        placeholder="Enter Your Email"
      />
      <Input
        value={data.password}
        onChange={(e) =>
          setData({
            ...data,
            password: e.target.value,
          })
        }
        type="password"
        placeholder="Enter Password"
      />

      <Button className={`${loading && "loading"}`} type="submit">
        Log In
      </Button>

      <P>
        Not Have an account? <Link to={"/register"}>Sign UP</Link>
      </P>
    </FormWrapper>
  );
};

export default Login;
