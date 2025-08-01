import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;


export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  // const {
  //   data: { service } = {},
  //   isLoading,
  //   error,
  // } = useSWR(`/api/services/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  function deleteService() {}

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={service.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>

      {/* <Link href={place.mapURL} passHref legacyBehavior>
        <StyledLocationLink>Location on Google Maps</StyledLocationLink>
      </Link> */}
      <ButtonContainer>
        {/* TODO  check href for correctness*/}
        {/* <Link href={`/services/${id}/update`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link> */}
        {/* <Link href={`/services/${id}/updateService`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link> */}

        <Link href={`/services/${id}/updateService`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>

        {/* <Link href={`/services/${id}/update-service`} passHref legacyBehavior>
          <StyledLink>Update</StyledLink>
        </Link> */}
        <StyledButton onClick={deleteService} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
    </>
  );
}
