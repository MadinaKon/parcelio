import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function UserProfileForm({ formName, defaultData, id }) {
  const router = useRouter();
  const { data: service, mutate } = useSWR("/api/users");
  const { data: session } = useSession();

  // formName={"update-profile"}
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.userId = session.user.userId;
    data.id = id;
    updateUserProfile(data);
  }

  async function updateUserProfile(data) {
    const response = await fetch(`/api/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
    }

    router.push("/");
  }

  return (
    <form aria-labelledby={formName} onSubmit={handleSubmit}>
      <h2>Profile form</h2>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        defaultValue={defaultData?.firstName}
        required
      />
      <br />
      <label htmlFor="lastName">last name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        defaultValue={defaultData?.lastName}
        required
      />
      <br />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        defaultValue={defaultData?.phoneNumber}
        required
      />
      <br />

      <button type="submit">
        {/* {defaultData ? "Update service" : "Add service"} */}
        Update user data
      </button>
    </form>
  );
}
