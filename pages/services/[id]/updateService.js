import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

export default function UpdateServicePage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: service,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/services/${id}`);

  async function updateService(service) {
    const response = await fetch(`/api/services/${id}`, {
      // TODO PATCH or PUT?
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });

    if (response.ok) {
      mutate();
    }

    router.push("/");
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="update-service">Update service</h2>
      <Link href={`/services/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form
        onSubmit={updateService}
        formName={"update-service"}
        defaultData={service}
      />
    </>
  );
}
