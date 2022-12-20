import { useNavigate } from "react-router-dom/dist";
import styled from "styled-components";

const Container = styled.div`
  background: #009bd6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 22px;
  color: #ffffff;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Heading = styled.h1`
  cursor: pointer;
`;

const Nav = styled.div`
  margin-left: 20px;
`;

const H3 = styled.h3`
  color: #009bd6;
  background: #ffffff;
  padding: 6px 20px;
  border-radius: 8px;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <LeftWrapper>
        <Heading
          onClick={() => {
            navigate("/");
          }}
        >
          WORKBIZ
        </Heading>
        <Nav>
          <H3
            onClick={() => {
              navigate("/postjob");
            }}
          >
            Post A Job
          </H3>
        </Nav>
      </LeftWrapper>

      <H3
        onClick={() => {
          navigate("/profile");
        }}
      >
        Profile
      </H3>
    </Container>
  );
};

export default Header;
