import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreateServicePage() {
  const router = useRouter();

  function addService(service) {
    console.log("Service added (but not really...)");
  }

  return (
    <>
      <h2 id="add-service">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addService} formName={"add-service"} />
    </>
  );
}
