import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Notification from "../notification/Notification";
import Divider from "../divider/Divider";
import { Grid } from "@mui/material";

export default function UserProfileForm({ formName, defaultData }) {
  const router = useRouter();
  const { data: service, mutate } = useSWR("/api/users");
  const { data: session } = useSession();
  const id = session?.user?.userId;

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
      <Grid container>
        <Grid item xs={12}>
          <h2>Profile form</h2>
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="name">Name</label>
        </Grid>
        <Grid item xs={11}>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={defaultData?.name}
            required
            readOnly
          />
        </Grid>
        <Grid item xs={1}>
          {" "}
          <label htmlFor="email">Email</label>
        </Grid>
        <Grid item xs={11}>
          <input
            id="email"
            name="email"
            type="text"
            defaultValue={defaultData?.email}
            required
            readOnly
          />
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="image">Image</label>
        </Grid>
        <Grid item xs={11}>
          <input
            id="image"
            name="image"
            type="text"
            defaultValue={defaultData?.image}
            required
            readOnly
          />
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="phoneNumber">Phone number</label>
        </Grid>
        <Grid item xs={11}>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            defaultValue={defaultData?.phoneNumber}
          />
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="country">Country</label>
        </Grid>
        <Grid item xs={11}>
          <input
            id="country"
            name="country"
            type="text"
            defaultValue={defaultData?.country}
          />
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="city">City</label>
        </Grid>
        <Grid item xs={11}>
          <input
            id="city"
            name="city"
            type="text"
            defaultValue={defaultData?.city}
          />
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="address">Address</label>
        </Grid>
        <Grid item xs={11}>
          <input
            id="address"
            name="address"
            type="text"
            defaultValue={defaultData?.address}
          />
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="postalCode">Postal code</label>
        </Grid>
        <Grid item xs={11}>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            defaultValue={defaultData?.postalCode}
          />
        </Grid>
        <Grid item xs={12}>
          <button type="submit" style={{ margin: "10px" }}>
            Update user data
          </button>
        </Grid>
        <Divider />
        <Notification defaultData={defaultData} />
      </Grid>
    </form>
  );
}
