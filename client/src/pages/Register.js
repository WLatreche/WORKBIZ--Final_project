import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormWrapper = styled.form`
  max-width: 486px;
  margin: 0 auto;
  display: flex;
  margin-top: 40px;
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

const Upload = styled.div`
  overflow: hidden;
  width: 100px;
  height: 100px;
  border: 1px solid #009bd6;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 10px 0;
`;

const UploadInput = styled.input`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
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

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("accessToken");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "lgnungmp");
    const options = {
      method: "POST",
      body: formData,
    };

    // Doing Request to the Cloudinary Image Upload
    fetch("https://api.cloudinary.com/v1_1/ddhmnfjrf/upload", options)
      .then((response) => response.json())
      .then((responseData) => {
        const { secure_url } = responseData;

        const { email, firstName, lastName, password } = data;

        const obj = {
          email,
          firstName,
          lastName,
          password,
          imageUrl: secure_url,
        };

        const newOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        };
        // Doing Request to the server to add job
        fetch("http://localhost:8000/register", newOptions)
          .then((response) => response.json())
          .then((data) => {
            const { accessToken } = data;
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            navigate("/home");
          })
          .catch((err) => console.log(err))
          .finally(setLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div
        style={{
          position: "relative",
        }}
      >
        <Upload>
          {selectedImage ? (
            <img
              src={window.URL.createObjectURL(selectedImage)}
              alt="Selected Images"
            />
          ) : (
            "Select Image"
          )}{" "}
        </Upload>
        <UploadInput
          type={"file"}
          onChange={(e) => {
            setSelectedImage(e.target.files[0]);
          }}
        />
      </div>
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
        value={data.firstName}
        onChange={(e) =>
          setData({
            ...data,
            firstName: e.target.value,
          })
        }
        placeholder="Enter First Name"
      />
      <Input
        value={data.lastName}
        onChange={(e) =>
          setData({
            ...data,
            lastName: e.target.value,
          })
        }
        placeholder="Enter Last Name"
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
        Sign UP
      </Button>

      <P>
        Already Have an account? <Link to={"/"}>Login</Link>
      </P>
    </FormWrapper>
  );
};

export default Register;
