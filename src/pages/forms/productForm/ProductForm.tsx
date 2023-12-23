import { useState } from "react";
import "./productForm.scss";
import { Button } from "antd";
import axios from "axios";
const ProductForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [perKgCost, setPerKgCost] = useState("");
  const [items, setItems] = useState([
    {
      itemSize: "",
      itemMaterial: "",
      quantity: 0,
      costPrice: 0,
      itemWeight: "",
      brand: "",
    },
  ]);
  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    let value = parseInt(e.target.value);
    newItems[index].quantity = value;
    setItems(newItems);
  };
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    newItems[index].costPrice = parseFloat(e.target.value);
    setItems(newItems);
  };
  const handleWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    newItems[index].itemWeight = e.target.value;
    setItems(newItems);
  };
  const handleSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    newItems[index].itemSize = e.target.value;
    setItems(newItems);
  };
  const handleMaterialChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    newItems[index].itemMaterial = e.target.value;
    setItems(newItems);
  };
  const handleBrandChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newItems = [...items];
    newItems[index].brand = e.target.value;
    setItems(newItems);
  };
  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    console.log(newItems);
  };
  const addItem = () => {
    setItems([
      ...items,
      {
        itemSize: "",
        itemMaterial: "",
        quantity: 0,
        costPrice: 0,
        itemWeight: "",
        brand: "",
      },
    ]);
  };
  const getBoughtItems = () => {
    let boughtItems = [
      {
        itemSize: "",
        itemMaterial: "",
        quantity: 0,
        costPrice: 0,
        itemWeight: 0,
        brand: 0,
      },
    ];
    return items.map((item, index) => {
      if (boughtItems[index]) {
        return {
          ...boughtItems[index],
          itemSize: item.itemSize,
          itemMaterial: item.itemMaterial,
          itemWeight: item.itemWeight,
          quantity: item.quantity,
          costPrice: item.costPrice,
          brand: item.brand,
        };
      } else {
        return {
          itemSize: item.itemSize,
          itemMaterial: item.itemMaterial,
          itemWeight: item.itemWeight,
          quantity: item.quantity,
          costPrice: item.costPrice,
          brand: item.brand,
        };
      }
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    setSelectedFile(file || null);
  };
  const handleAddItemsSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const itemFormData = new URLSearchParams();
    let boughtItems = getBoughtItems();
    itemFormData.append("Items", JSON.stringify(boughtItems));
    itemFormData.append("Cost", JSON.stringify(perKgCost));

    console.log("API response: ", itemFormData);

    axios
      .post(
        "http://localhost:8080/hassan-hardware/items/addAll",
        itemFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
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
    <div className="productFormCss">
      <div className="box">
        <div className="innerBox box1">
          <form className="form1" onSubmit={handleAddItemsSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h5>Add Products</h5>
              <input
                type="text"
                placeholder="Per Kg Cost"
                value={perKgCost}
                onChange={(e) => {
                  setPerKgCost(e.target.value);
                }}
                style={{ width: "130px" }}
              />
            </div>
            <table className="table table-hover table-sm">
              <thead>
                <tr className="custom-cell">
                  <th scope="col" style={{ width: "400px" }}>
                    Size
                  </th>
                  <th scope="col">Brand</th>
                  <th scope="col">Material</th>
                  <th scope="col">Weight Per Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Cost Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="custom-cell" style={{ width: "350px" }}>
                      <input
                        type="text"
                        placeholder="Size"
                        value={item.itemSize}
                        onChange={(e) => {
                          handleSizeChange(e, index);
                        }}
                        style={{ width: "130px" }}
                      />
                    </td>
                    <td className="custom-cell" style={{ width: "350px" }}>
                      <input
                        type="text"
                        placeholder="Brand"
                        value={item.brand}
                        onChange={(e) => {
                          handleBrandChange(e, index);
                        }}
                        style={{ width: "130px" }}
                      />
                    </td>
                    <td className="custom-cell" style={{ width: "350px" }}>
                      <input
                        type="text"
                        placeholder="Material"
                        value={item.itemMaterial}
                        onChange={(e) => {
                          handleMaterialChange(e, index);
                        }}
                        style={{ width: "130px" }}
                      />
                    </td>
                    <td className="custom-cell" style={{ width: "350px" }}>
                      <input
                        type="text"
                        placeholder="Weight Per Item"
                        value={item.itemWeight}
                        onChange={(e) => {
                          handleWeightChange(e, index);
                        }}
                        style={{ width: "130px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => {
                          handleQuantityChange(e, index);
                        }}
                        style={{ width: "130px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.costPrice}
                        onChange={(e) => {
                          handlePriceChange(e, index);
                        }}
                        style={{ width: "130px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-light" type="button" onClick={addItem}>
              Add Item
            </button>
            <button className="btn btn-success" type="submit">
              Confirm
            </button>
            {/*            <div className="title">
              <h5>New Product</h5>
            </div>
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="size"
                  placeholder="Enter Size"
                  aria-label="Name"
                  aria-describedby="basic-addon3 basic-addon4"
                  onChange={(e) => setItemSize(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="material" className="form-label">
                Material
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="material"
                  placeholder="Enter Material"
                  aria-label="Number"
                  aria-describedby="basic-addon3 basic-addon4"
                  onChange={(e) => setItemMaterial(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Item Weight
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  placeholder="Enter Quantity"
                  aria-label="Role"
                  aria-describedby="basic-addon3 basic-addon4"
                  onChange={(e) => setItemWeight(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  placeholder="Enter Quantity"
                  aria-label="Role"
                  aria-describedby="basic-addon3 basic-addon4"
                  onChange={(e) => setItemQuantity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="cost" className="form-label">
                Cost Price
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="cost"
                  placeholder="Enter Cost"
                  aria-label="Role"
                  aria-describedby="basic-addon3 basic-addon4"
                  onChange={(e) => setCostPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              className="btn btn-primary"
              htmlType="submit"
              value="Submit"
              onSubmit={() => console.log("Handle Submit")}
            >
              Confirm
                    </Button>*/}
          </form>
        </div>

        <div className="innerBox box2">
          <form className="form2" onSubmit={handleAddFileSubmit}>
            <div className="title">
              <h5>Upload File</h5>
            </div>
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
                onChange={handleFileChange}
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </div>
            <Button
              className="btn btn-primary"
              htmlType="submit"
              value="Submit"
            >
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
