import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function UserProfileForm({ formName, defaultData, id }) {
  const router = useRouter();
  const { data: service, mutate } = useSWR("/api/users");
  const { data: session } = useSession();

  //   console.log("LOGGED IN USER ", session);
  //   console.log("SESSION USER ", session.user);
  //   console.log("SESSION USER ID ", session.user.userId);

  console.log("DEFAULT DATA ", defaultData);

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

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
        required
      />
      <br />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        defaultValue={defaultData?.email}
        required
      />
      <br />
      <label htmlFor="image">Image</label>
      <input
        id="image"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
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
