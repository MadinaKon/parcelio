import React from "react";

export default function SenderForm({ onSubmit, formName, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log("DATA ", data);

    onSubmit(data);
  }

  //   address: { type: String, required: true },
  //   postalCode: { type: String, required: true },
  //   enum: directionEnum,

  return (
    <form aria-labelledby={formName} onSubmit={handleSubmit}>
      <label htmlFor="packageType">Package type</label>
      <input
        id="packageType"
        name="packageType"
        type="text"
        defaultValue={defaultData?.packageType}
      />
      <br />
      <label htmlFor="totalWeight">Total weight</label>
      <input
        id="totalWeight"
        name="totalWeight"
        type="text"
        defaultValue={defaultData?.totalWeight}
      />
      <br />

      <label htmlFor="height">Height</label>
      <input
        id="height"
        name="height"
        type="text"
        defaultValue={defaultData?.height}
      />
      <br />

      <label htmlFor="width">Width</label>
      <input
        id="width"
        name="width"
        type="text"
        defaultValue={defaultData?.height}
      />
      <br />
      <label htmlFor="length">Length</label>
      <input
        id="length"
        name="length"
        type="text"
        defaultValue={defaultData?.height}
      />
      <br />

      {/* <label htmlFor="lastName">last name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        defaultValue={defaultData?.lastName}
      />
      <br /> */}
      {/* <label htmlFor="userName">userName</label>
      <input
        id="userName"
        name="userName"
        type="text"
        defaultValue={defaultData?.userName}
      />
      <br /> 
            <label htmlFor="country">country</label>
      <input
        id="country"
        name="country"
        type="text"
        defaultValue={defaultData?.country}
      />
      <br />
            <label htmlFor="city">city</label>
      <input
        id="city"
        name="city"
        type="text"
        defaultValue={defaultData?.city}
      />
      <br />

            <label htmlFor="address">address</label>
      <input
        id="address"
        name="address"
        type="text"
        defaultValue={defaultData?.address}
      />
      <br />

      <label htmlFor="postalCode">postalCode</label>
      <input
        id="postalCode"
        name="postalCode"
        type="text"
        defaultValue={defaultData?.postalCode}
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
      */}

      <label htmlFor="weight">Weight</label>
      <input
        name="weight"
        id="weight"
        type="text"
        defaultValue={defaultData?.weight}
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
