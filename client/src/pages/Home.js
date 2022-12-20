import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1152px;
  margin: 30px auto;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #009bd6;
  outline: none;
  border-radius: 8px;
  margin: 0 10px;
`;

const Option = styled.option``;

const Card = styled.div`
  width: 270px;
  margin: 18px;
  background: #f5f5f5;
  border-radius: 14px;
  padding: 10px;
  overflow: hidden;
`;

const Image = styled.img`
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

const Phone = styled.i``;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 70px;
`;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("job");
  const [jobsData, setJobsData] = useState([]);
  const [jobersData, setJobersData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const HandleSearch = () => {
    setLoading(true);
    setIsSearched(true);
    if (dropDownValue === "job") {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: JSON.stringify({ jobTitle: inputValue }),
      };
      // Doing Request to the server to add job
      fetch("http://localhost:8000/getJobs", options)
        .then((response) => response.json())
        .then((data) => {
          setJobsData(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else if (dropDownValue === "jober") {
      console.log("Loger Request");

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: JSON.stringify({ joberName: inputValue }),
      };
      // Doing Request to the server to add job
      fetch("http://localhost:8000/jobers", options)
        .then((response) => response.json())
        .then((data) => {
          setJobersData(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  if (!isSearched && jobsData.length === 0 && jobersData.length === 0) {
    return (
      <Container>
        <Flex>
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="Enter Something to search"
          />
          <Select
            value={dropDownValue}
            onChange={(e) => {
              setDropDownValue(e.target.value);
            }}
          >
            <Option value={"job"}>Search For Job</Option>
            <Option value={"jober"}>Search For Jober</Option>
          </Select>
          <Button className={`${loading && "loading"}`} onClick={HandleSearch}>
            Search
          </Button>
        </Flex>

        <Heading style={{ textAlign: "center" }}>
          Search Some thing to see
        </Heading>
      </Container>
    );
  }

  return (
    <Container>
      <Flex>
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="Enter Something to search"
        />
        <Select
          value={dropDownValue}
          onChange={(e) => {
            setJobersData([]);
            setJobsData([]);
            setIsSearched(false);
            setDropDownValue(e.target.value);
          }}
        >
          <Option value={"job"}>Search For Job</Option>
          <Option value={"jober"}>Search For Jober</Option>
        </Select>
        <Button className={`${loading && "loading"}`} onClick={HandleSearch}>
          Search
        </Button>
      </Flex>

      {loading ? (
        <Heading style={{ textAlign: "center" }}>Loading ...</Heading>
      ) : (
        <>
          {dropDownValue === "job" && (
            <>
              {jobsData.length > 0 ? (
                <Flex style={{ flexWrap: "wrap" }}>
                  {jobsData.map((jobDetails) => (
                    <Card>
                      <Image
                        src={jobDetails?.imageUrl}
                        alt={jobDetails?.title}
                      />
                      <Heading>{jobDetails?.title}</Heading>

                      <P>{jobDetails?.description}</P>

                      <Phone> Contact No: {jobDetails?.contactNo}</Phone>
                    </Card>
                  ))}
                </Flex>
              ) : (
                <Heading>Nothing Found</Heading>
              )}
            </>
          )}

          {dropDownValue === "jober" && (
            <>
              {jobersData.length > 0 ? (
                <div>
                  {jobersData?.map((joberData) => (
                    <Card style={{ width: "100%" }} key={joberData._id}>
                      <Flex style={{ justifyContent: "start" }}>
                        <Avatar
                          src={joberData?.imageUrl}
                          alt={joberData?.firstName}
                        />
                        <div style={{ marginLeft: "30px" }}>
                          <Heading>
                            {joberData?.firstName} {joberData?.lastName}
                          </Heading>

                          <Phone>{joberData?.email}</Phone>
                        </div>
                      </Flex>
                    </Card>
                  ))}
                </div>
              ) : (
                <Heading>Nothing Found</Heading>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
