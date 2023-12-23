import { useState } from "react";
import axios from "axios";

const AddItemForm = () => {
  const [itemSize, setItemSize] = useState("");
  const [itemMaterial, setItemMaterial] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    setSelectedFile(file || null);
  };
  const handleAddItemSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const itemFormData = new FormData();

    itemFormData.append(
      "Item",
      JSON.stringify({
        itemSize,
        itemMaterial,
        itemWeight,
      })
    );

    itemFormData.append(
      "ItemRecord",
      JSON.stringify({
        costPrice,
        quantity: itemQuantity,
      })
    );
    console.log("API response: ", itemFormData);

    axios
      .post("http://localhost:8080/hassan-hardware/items/add", itemFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
      });
  };
  const handleAddFileSubmit = async (event: React.FormEvent) => {
    console.log("form Submitted");
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("http://localhost:8080/hassan-hardware/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("API response:", response.data);
        })
        .catch((error) => {
          console.error("Error occurred while making the API call:", error);
        });
    }
  };
  return (
    <>
      <form className="row g-3" name="NewCustomer" onSubmit={() => {}}>
        <h5>Add New Item</h5>
        <h5>Item Information</h5>
        <br />
        <div className="col-md-6">
          <label htmlFor="inputItemSize" className="form-label">
            Item Size
          </label>
          <input
            type="text"
            className="form-control"
            id="inputItemSize"
            value={itemSize}
            onChange={(e) => setItemSize(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputItemMaterial" className="form-label">
            Item Material
          </label>
          <input
            type="text"
            className="form-control"
            id="inputItemMaterial"
            value={itemMaterial}
            onChange={(e) => setItemMaterial(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputItemWeight" className="form-label">
            Item Weight
          </label>
          <input
            type="number"
            className="form-control"
            id="inputItemWeight"
            value={itemWeight}
            onChange={(e) => setItemWeight(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputItemQuantity" className="form-label">
            Item Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="inputItemQuantity"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputItemCost" className="form-label">
            Item Cost
          </label>
          <input
            type="number"
            className="form-control"
            id="inputItemCost"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddItemSubmit}
          >
            Add Item
          </button>
        </div>
      </form>
      <form className="row g-3" name="NewCustomer" onSubmit={() => {}}>
        <h5> Upload File</h5>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            id="inputSelectedFile"
            aria-describedby="inputUploadFileSubmit"
            aria-label="Upload"
            onChange={handleFileChange}
            required
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="inputUploadFileSubmit"
            onClick={handleAddFileSubmit}
          >
            Upload
          </button>
        </div>{" "}
      </form>
    </>
  );
};

export default AddItemForm;
