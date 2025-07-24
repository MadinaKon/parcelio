import Link from "next/link.js";
import styled from "styled-components";
import { StyledLink } from "../components/StyledLink.js";
import TransporterForm from "../components/form/TransporterForm.js";
import SenderForm from "../components/form/SenderForm.js";
import { useSession } from "next-auth/react";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreateServicePage() {
  const { data: session } = useSession();

  // if (!session) {
  //   // router.push("/");
  //   router.push()
  // }

  return (
    <>
      {session && (
        <>
          {" "}
          <h2 id="add-service">Add Service</h2>
          <Link href="/" passHref legacyBehavior>
            <StyledBackLink>back</StyledBackLink>
          </Link>
          <TransporterForm formName={"add-service"} />
        </>
      )}
    </>
  );
}
