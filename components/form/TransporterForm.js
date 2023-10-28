import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Grid } from "@mui/material";

export default function TransporterForm({ formName, defaultData, id }) {
  const router = useRouter();
  const { data: service, mutate } = useSWR("/api/services");
  const { data: session } = useSession();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.userId = session.user.userId;
    data.id = id;

    if (formName === "add-service") {
      addService(data);
    } else if (formName === "update-service") {
      updateService(data);
    } else {
      deleteService(id);
    }
  }

  async function addService(service) {
    const response = await fetch("/api/services", {
      method: "POST",
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

  async function updateService(data) {
    const response = await fetch(`/api/services/${id}`, {
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
  async function deleteService(id) {
    await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  }

  return (
    <form aria-labelledby={formName} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          {" "}
          <label htmlFor="firstName">First name</label>
        </Grid>
        <Grid item xs={6}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue={defaultData?.firstName}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="lastName">last name</label>
        </Grid>
        <Grid item xs={6}>
          <input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue={defaultData?.lastName}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="userName">userName</label>
        </Grid>
        <Grid item xs={6}>
          <input
            id="userName"
            name="userName"
            type="text"
            defaultValue={defaultData?.userName}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="fromCity">From city</label>
        </Grid>
        <Grid item xs={6}>
          <input
            id="fromCity"
            name="fromCity"
            type="text"
            defaultValue={defaultData?.fromCity}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="toCity">To city</label>
        </Grid>
        <Grid item xs={6}>
          <input
            id="toCity"
            name="toCity"
            type="text"
            defaultValue={defaultData?.toCity}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="flightDateTime">Flight date</label>
        </Grid>
        <Grid item xs={6}>
          <input
            id="flightDateTime"
            name="flightDateTime"
            type="date"
            defaultValue={defaultData?.flightDateTime}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="availableKilos">availableKilos</label>
        </Grid>
        <Grid item xs={6}>
          <input
            id="availableKilos"
            name="availableKilos"
            type="text"
            defaultValue={defaultData?.availableKilos}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="phoneNumber">Phone number</label>
        </Grid>
        <Grid item xs={6}>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            defaultValue={defaultData?.phoneNumber}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="description">Description</label>
        </Grid>
        <Grid item xs={6}>
          <textarea
            name="description"
            id="description"
            cols="16"
            rows="10"
            defaultValue={defaultData?.description}
          ></textarea>
        </Grid>
        <Grid item xs={6}>
          <button type="submit">
            {defaultData ? "Update service" : "Add service"}
          </button>
        </Grid>
      </Grid>
    </form>
  );
}
