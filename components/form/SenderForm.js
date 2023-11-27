import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Grid } from "@mui/material";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledTextArea,
} from "./css.styled";

export default function SenderForm({
  formName,
  defaultData,
  serviceId,
  transporterId,
}) {
  const { data: service, mutate } = useSWR("/api/services");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    openSenderRequest(data);
  }

  async function openSenderRequest(requestBody) {
    const response = await fetch("/api/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...requestBody,
        serviceId: serviceId,
        userId: transporterId,
      }),
    });

    if (response.ok) {
      mutate();
    }

    // router.push("/");
  }

  return (
    <StyledForm aria-labelledby={formName} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <h4>Send the details of the package</h4>
        </Grid>
        {/* {defaultData ? "Update service details" : "Send the details of the package"} */}
        <Grid item xs={6}>
          <label htmlFor="email">Email *</label>
        </Grid>
        <Grid item xs={6}>
          <StyledInput
            id="email"
            name="email"
            type="email"
            defaultValue={defaultData?.email}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="phone">Phone number *</label>
        </Grid>
        <Grid item xs={6}>
          <StyledInput
            id="phone"
            name="phoneNumber"
            type="text"
            defaultValue={defaultData?.phone}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="packageType">Package type *</label>
        </Grid>
        <Grid item xs={6}>
          <StyledInput
            id="packageType"
            name="packageType"
            type="text"
            defaultValue={defaultData?.packageType}
            required
          />
        </Grid>
        <Grid item xs={6}>
          {" "}
          <label htmlFor="totalWeight">Total weight *</label>
        </Grid>
        <Grid item xs={6}>
          <StyledInput
            id="totalWeight"
            name="totalWeight"
            type="text"
            defaultValue={defaultData?.totalWeight}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="height">Height *</label>
        </Grid>
        <Grid item xs={6}>
          <StyledInput
            id="height"
            name="height"
            type="text"
            defaultValue={defaultData?.height}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="width">Width *</label>
        </Grid>
        <Grid item xs={6}>
          <StyledInput
            id="width"
            name="width"
            type="text"
            defaultValue={defaultData?.height}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="length">Length *</label>
        </Grid>
        <Grid item xs={6}>
          <StyledInput
            id="length"
            name="length"
            type="text"
            defaultValue={defaultData?.height}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="weight">Weight *</label>
        </Grid>
        <Grid item xs={6}>
          <StyledInput
            name="weight"
            id="weight"
            type="text"
            defaultValue={defaultData?.weight}
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

        <StyledButton type="submit">Submit</StyledButton>
      </Grid>
    </StyledForm>
  );
}
