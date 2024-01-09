import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Grid } from "@mui/material";
import CustomCloseIcon from "../layouts/CloseIcon";
import styled from "styled-components";

const StyledForm = styled.form`
  margin-top: 30px;
  margin-bottom: 70px;
`;

const StyledInputLabel = styled.label`
  margin-bottom: 10px;
`;

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
  border-radius: 5px;
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  border: 2px solid #eee;
  padding: 10px;
  margin-bottom: 10px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const InputField = ({ label, id, name, type, defaultValue, required }) => (
  <>
    <StyledInputLabel htmlFor={id}>{label} *</StyledInputLabel>
    <StyledInput
      id={id}
      name={name}
      type={type}
      defaultValue={defaultValue}
      required={required}
    />
  </>
);

export default function TransporterForm({ formName, defaultData, id }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: service, mutate } = useSWR("/api/services");
  const { data: session } = useSession();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("Close is clicked");
  };

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
    <StyledForm aria-labelledby={formName} onSubmit={handleSubmit}>
      <h2>Create a service form</h2>
      <CustomCloseIcon onClick={handleClose} />
      <Grid container>
        <Grid item xs={6}>
          {" "}
          {/* <label htmlFor="firstName">First name *</label> */}
          <InputField
            label="First name"
            id="firstName"
            name="firstName"
            type="text"
            defaultValue={defaultData?.firstName}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputField
            label="Last name"
            id="lastName"
            name="lastName"
            type="text"
            defaultValue={defaultData?.lastName}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputField
            label="Username"
            id="userName"
            name="userName"
            type="text"
            defaultValue={defaultData?.userName}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputField
            label="fromCity"
            id="fromCity"
            name="fromCity"
            type="text"
            defaultValue={defaultData?.fromCity}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputField
            label="toCity"
            id="toCity"
            name="toCity"
            type="text"
            defaultValue={defaultData?.toCity}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputField
            label="flightDateTime"
            id="flightDateTime"
            name="flightDateTime"
            type="text"
            defaultValue={defaultData?.flightDateTime}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputField
            label="availableKilos"
            id="availableKilos"
            name="availableKilos"
            type="text"
            defaultValue={defaultData?.availableKilos}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputField
            label="phoneNumber"
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
          <StyledTextArea
            name="description"
            id="description"
            cols="16"
            rows="5"
            defaultValue={defaultData?.description}
          ></StyledTextArea>
        </Grid>
        <Grid item xs={4}>
          <StyledButton type="submit">
            {defaultData ? "Update service" : "Add service"}
          </StyledButton>
        </Grid>
      </Grid>
    </StyledForm>
  );
}
