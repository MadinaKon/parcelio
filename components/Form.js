import React from "react";

export default function Form({ onSubmit, formName, defaultData }) {
  console.log(" onSubmit ", onSubmit);
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

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
