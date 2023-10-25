import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

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
    <form aria-labelledby={formName} onSubmit={handleSubmit}>
      <h3>Send a package details</h3>

      {/* {defaultData ? "Update service details" : "Send a package details"} */}
      <br />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        defaultValue={defaultData?.email}
        required
      />
      <br />
      <label htmlFor="phone">Phone number</label>
      <input
        id="phone"
        name="phoneNumber"
        type="text"
        defaultValue={defaultData?.phone}
        required
      />
      <br />
      <label htmlFor="packageType">Package type</label>
      <input
        id="packageType"
        name="packageType"
        type="text"
        defaultValue={defaultData?.packageType}
        required
      />
      <br />
      <label htmlFor="totalWeight">Total weight</label>
      <input
        id="totalWeight"
        name="totalWeight"
        type="text"
        defaultValue={defaultData?.totalWeight}
        required
      />
      <br />

      <label htmlFor="height">Height</label>
      <input
        id="height"
        name="height"
        type="text"
        defaultValue={defaultData?.height}
        required
      />
      <br />

      <label htmlFor="width">Width</label>
      <input
        id="width"
        name="width"
        type="text"
        defaultValue={defaultData?.height}
        required
      />
      <br />
      <label htmlFor="length">Length</label>
      <input
        id="length"
        name="length"
        type="text"
        defaultValue={defaultData?.height}
        required
      />
      <br />
      <label htmlFor="weight">Weight</label>
      <input
        name="weight"
        id="weight"
        type="text"
        defaultValue={defaultData?.weight}
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
