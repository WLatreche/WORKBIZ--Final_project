import { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.form`
  max-width: 786px;
  margin: 0 auto;
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

const TextArea = styled.textarea`
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

const PostJob = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    contact: "",
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

        const { title, description, contact } = data;

        const obj = {
          title,
          description,
          contactNo: contact,
          userId: "Hamzi",
          imageUrl: secure_url,
        };

        const newOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
          body: JSON.stringify(obj),
        };
        // Doing Request to the server to add job
        fetch("http://localhost:8000/addjob", newOptions)
          .then((response) => response.json())
          .then((data) => {
            window.alert(data.message);
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
      <Input
        value={data.title}
        onChange={(e) =>
          setData({
            ...data,
            title: e.target.value,
          })
        }
        placeholder="Enter Job Title"
      />
      <TextArea
        value={data.description}
        onChange={(e) =>
          setData({
            ...data,
            description: e.target.value,
          })
        }
        placeholder="Enter Job Description"
      />
      <Input
        value={data.contact}
        onChange={(e) =>
          setData({
            ...data,
            contact: e.target.value,
          })
        }
        placeholder="Enter Phone Number"
      />

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
      <Button className={`${loading && "loading"}`} type="submit">
        Submit
      </Button>
    </FormWrapper>
  );
};

export default PostJob;
