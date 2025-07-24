import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Notification from "../notification/Notification";
import { Grid } from "@mui/material";

import styled from "styled-components";
import Image from "next/image";

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
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 1000;
`;

export default function UserProfileForm({ formName, defaultData }) {
  const { mutate } = useSWR("/api/users");
  const { data: session } = useSession();
  const id = session?.user?.userId;
  const [name, setName] = useState(defaultData?.name || "");
  const [email, setEmail] = useState(defaultData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    defaultData?.phoneNumber || ""
  );
  const [country, setCountry] = useState(defaultData?.country || "");
  const [city, setCity] = useState(defaultData?.city || "");
  const [address, setAddress] = useState(defaultData?.address || "");
  const [postalCode, setPostalCode] = useState(defaultData?.postalCode || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultData?.image || "");

  useEffect(() => {
    if (defaultData) {
      setName(defaultData.name || "");
      setEmail(defaultData.email || "");
      setPhoneNumber(defaultData.phoneNumber || "");
      setCountry(defaultData.country || "");
      setCity(defaultData.city || "");
      setAddress(defaultData.address || "");
      setPostalCode(defaultData.postalCode || "");
      setImagePreview(defaultData.image || "");
    }
  }, [defaultData]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.userId = session.user.userId;
    data.id = id;

    updateUserProfile(data);
  }

  async function updateUserProfile(data) {
    const formData = new FormData();

    // Add all form fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Add image file if selected
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      // Don't set Content-Type header, let the browser set it with the boundary
      body: formData,
    });

    if (response.ok) {
      mutate(); // Refresh the data
    }
  }

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImageFile(file);
  //   if (file) {
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      // Revoke previous URL if it exists
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!defaultData) {
    return <div>Loading...</div>;
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly
          />
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="image">Image</label>
        </Grid>
        <Grid item xs={11}>
          {/* <StyledInput
            id="image"
            name="image"
            type="text"
            defaultValue={defaultData?.image || ""}
            required
          /> */}

          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={150}
              height={150}
              style={{ marginTop: "10px", objectFit: "contain" }}
            />
          )}
        </Grid>
        <Grid item xs={1}>
          <label htmlFor="phoneNumber">Phone number</label>
        </Grid>
        <Grid item xs={11}>
          <StyledInput
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <StyledButton type="submit" style={{ margin: "10px" }}>
            Update user data
          </StyledButton>
        </Grid>

        {/* <Notification defaultData={defaultData} /> */}
      </Grid>
    </form>
  );
}
