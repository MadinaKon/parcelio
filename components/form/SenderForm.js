import React from "react";

export default function SenderForm({ onSubmit, formName, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log("DATA ", data);

    onSubmit(data);
  }

  return (
    <form aria-labelledby={formName} onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        defaultValue={defaultData?.firstName}
      />
      <br />
      <label htmlFor="lastName">last name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        defaultValue={defaultData?.lastName}
      />
      <br />
      <label htmlFor="userName">userName</label>
      <input
        id="userName"
        name="userName"
        type="text"
        defaultValue={defaultData?.userName}
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        defaultValue={defaultData?.password}
      />
      <br />
      <label htmlFor="fromCity">From city</label>
      <input
        id="fromCity"
        name="fromCity"
        type="text"
        defaultValue={defaultData?.fromCity}
      />
      <br />
      <label htmlFor="toCity">To city</label>
      <input
        id="toCity"
        name="toCity"
        type="text"
        defaultValue={defaultData?.toCity}
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
