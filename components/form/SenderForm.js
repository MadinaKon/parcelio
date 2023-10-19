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
      {/* <button className="close-button" onClick={onClose}> */}
      <button className="close-button">X</button>
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
