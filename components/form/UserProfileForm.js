import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Notification from "../notification/Notification";
import Divider from "../divider/Divider";

export default function UserProfileForm({ formName, defaultData }) {
  const router = useRouter();
  const { data: service, mutate } = useSWR("/api/users");
  const { data: session } = useSession();
  const id = session?.user?.userId;

  console.log("DEFAULT DATA IN USER PROFILE ", defaultData);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.userId = session.user.userId;
    data.id = id;

    updateUserProfile(data);
  }

  async function updateUserProfile(data) {
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
    }
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
        readOnly
      />
      <br />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        defaultValue={defaultData?.email}
        required
        readOnly
      />
      <br />
      <label htmlFor="image">Image</label>
      <input
        id="image"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
        required
        readOnly
      />
      <br />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        defaultValue={defaultData?.phoneNumber}
      />
      <br />

      <label htmlFor="country">Country</label>
      <input
        id="country"
        name="country"
        type="text"
        defaultValue={defaultData?.country}
      />
      <br />
      <label htmlFor="city">City</label>
      <input
        id="city"
        name="city"
        type="text"
        defaultValue={defaultData?.city}
      />
      <br />

      <label htmlFor="address">Address</label>
      <input
        id="address"
        name="address"
        type="text"
        defaultValue={defaultData?.address}
      />
      <br />

      <label htmlFor="postalCode">Postal code</label>
      <input
        id="postalCode"
        name="postalCode"
        type="text"
        defaultValue={defaultData?.postalCode}
      />
      <br />
      <button type="submit">
        {/* {defaultData ? "Update service" : "Add service"} */}
        Update user data
      </button>
      <Divider />
      <Notification />
    </form>
  );
}
