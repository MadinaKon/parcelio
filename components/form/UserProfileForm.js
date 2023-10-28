import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Notification from "../notification/Notification";
import Divider from "../divider/Divider";
import { Grid } from "@mui/material";

import styled from "styled-components";

const StyledInput = styled.input`
  border: 2px solid #eee;
  padding: 10px;
  margin-bottom: 10px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #1976d2;
  color: #fff;
  font-weight: 600;
  border-radius: 5px;
  width: 100%;
`;

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
          <StyledInput
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
          <StyledInput
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
          <StyledInput
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
          <StyledInput
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
          <StyledInput
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
          <StyledInput
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
          <StyledInput
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
          <StyledInput
            id="postalCode"
            name="postalCode"
            type="text"
            defaultValue={defaultData?.postalCode}
          />
        </Grid>
        <Grid item xs={2}>
          <StyledButton type="submit" style={{ margin: "10px" }}>
            Update user data
          </StyledButton>
        </Grid>
        {/* <Divider /> */}
        <Notification defaultData={defaultData} />
      </Grid>
    </form>
  );
}
