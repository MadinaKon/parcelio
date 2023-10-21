import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

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

    //console.log("TransporterForm DATA ", data);

    updateService(data);
  }

  async function updateService(data) {
    console.log(data);

    // const foundObject = findObjectById(service, id);
    // console.log("FOUND OBJECT ", foundObject);

    const response = await fetch(`/api/services/${id}`, {
      // TODO PATCH or PUT?
      method: "PUT",
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
      <label htmlFor="userName">userName</label>
      <input
        id="userName"
        name="userName"
        type="text"
        defaultValue={defaultData?.userName}
        required
      />
      <br />
      {/* <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        defaultValue={defaultData?.password}
      />
      <br /> */}
      <label htmlFor="fromCity">From city</label>
      <input
        id="fromCity"
        name="fromCity"
        type="text"
        defaultValue={defaultData?.fromCity}
        required
      />
      <br />
      <label htmlFor="toCity">To city</label>
      <input
        id="toCity"
        name="toCity"
        type="text"
        defaultValue={defaultData?.toCity}
        required
      />
      <br />
      <label htmlFor="flightDateTime">Flight date time</label>
      <input
        id="flightDateTime"
        name="flightDateTime"
        type="date"
        defaultValue={defaultData?.flightDateTime}
        required
      />
      <br />
      <label htmlFor="availableKilos">availableKilos</label>
      <input
        id="availableKilos"
        name="availableKilos"
        type="text"
        defaultValue={defaultData?.availableKilos}
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
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
      ></textarea>
      <br />
      <button type="submit">
        {defaultData ? "Update service" : "Add service"}
      </button>
    </form>
  );
}
