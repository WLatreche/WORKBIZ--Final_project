import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoadingText = styled.h1`
  text-align: center;
`;

const Wraper = styled.div`
  max-width: 700px;
  margin: 40px auto;
`;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;
// const Div = styled.div`
//   width: 100%;
//   margin-top: 10px;
// `;

// const Label = styled.label`
//   font-weight: 600;
//   font-size: 20px;
//   color: #009bd6;
// `;

// const Input = styled.input`
//   width: 100%;
//   outline: none;
//   padding: 6px 10px;
//   border: 1px solid #009bd6;
//   border-radius: 6px;
// `;

// const Button = styled.button`
//   padding: 6px 12px;
//   background: #009bd6;
//   border: none;
//   outline: none;
//   color: #ffffff;
//   font-weight: 600;
//   font-size: 18px;
//   border-radius: 8px;
//   margin-top: 10px;
// `;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`;

const TextWrapper = styled.div`
  margin: 0 0 30px 20px;
`;

const H1 = styled.h1`
  font-weight: 700;
`;

const H4 = styled.h4`
  font-weight: 500;
  font-style: italic;
`;

const Card = styled.div`
  width: 270px;
  margin: 18px;
  background: #f5f5f5;
  border-radius: 14px;
  padding: 10px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const Heading = styled.h1`
  font-weight: 600;
  font-size: 20px;
  margin: 8px 0;
`;

const P = styled.p`
  font-weight: 500;
  font-size: 16px;
`;

const LogoutButton = styled.button`
  background: #009bd6;
  color: #ffffff;
  padding: 6px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
`;

const Button = styled.button`
  background: #009bd6;
  border: none;
  color: #ffffff;
  padding: 10px 40px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  margin: 5px;
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

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [jobsData, setJobsData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    };
    // Doing Request to the server
    fetch("http://localhost:8000/currentuser", options)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    const newOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    };
    // Doing Request to the server to add job
    fetch("http://localhost:8000/currentusersjobs", newOptions)
      .then((response) => response.json())
      .then((data) => {
        setJobsData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
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

        const { email, firstName, lastName, _id } = userData;

        const obj = {
          _id,
          email,
          firstName,
          lastName,
          imageUrl: secure_url,
        };

        const newOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
          body: JSON.stringify(obj),
        };
        // Doing Request to the server to add job
        fetch("http://localhost:8000/updateProfile", newOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setEdit(false);
          })
          .catch((err) => console.log(err))
          .finally(setLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <LoadingText>Loading ....</LoadingText>;
  }
  return (
    <Wraper>
      <Flex>
        <Flex style={{ alignItems: "flex-end" }}>
          {edit ? (
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
          ) : (
            <Image src={userData?.imageUrl} alt="avatr" />
          )}
          <TextWrapper>
            {edit ? (
              <Flex>
                <Input
                  value={userData?.firstName}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      firstName: e.target.value,
                    });
                  }}
                />
                <Input
                  value={userData?.lastName}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      lastName: e.target.value,
                    });
                  }}
                />
              </Flex>
            ) : (
              <H1>
                {userData?.firstName} {userData?.lastName}
              </H1>
            )}
            {edit ? (
              <Input
                value={userData?.email}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  });
                }}
              />
            ) : (
              <H4>{userData?.email}</H4>
            )}
          </TextWrapper>
        </Flex>

        <Button
          onClick={() => {
            if (!edit) {
              setEdit(true);
            } else {
              handleSubmit();
            }
          }}
        >
          {edit ? "update" : "Edit"}
        </Button>
      </Flex>

      {jobsData && (
        <div style={{ marginTop: "30px" }}>
          <H1>Your Jobs</H1>
          <Flex style={{ flexWrap: "wrap" }}>
            {jobsData.map((jobDetails) => (
              <Card>
                <CardImage src={jobDetails?.imageUrl} alt={jobDetails?.title} />
                <Heading>{jobDetails?.title}</Heading>

                <P>{jobDetails?.description}</P>
              </Card>
            ))}
          </Flex>
        </div>
      )}

      <LogoutButton
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </LogoutButton>
    </Wraper>
  );
};

export default Profile;
