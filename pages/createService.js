import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import { StyledLink } from "../components/StyledLink.js";
import useSWR from "swr";
import TransporterForm from "../components/form/TransporterForm.js";
import SenderForm from "../components/form/SenderForm.js";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreateServicePage() {
  const { mutate } = useSWR("/api/services");
  const router = useRouter();

  return (
    <>
      <h2 id="add-service">Add Service</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <TransporterForm formName={"add-service"} />
    </>
  );
}
