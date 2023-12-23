import { useState } from "react";
import Alert from "./Alert";
import Button from "./Button";
import ListGroup from "./ListGroup";

const AppComponents = () => {
  let items = ["New York", "San Francesco", "London", "Tokyo", "Paris"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      {showAlert && (
        <Alert alertType="danger" onClose={() => setShowAlert(false)}>
          <strong>HI THIS IS AN ALERT!!!!!</strong>
        </Alert>
      )}
      <Button onClick={() => setShowAlert(true)}>Submit Form</Button>
    </div>
  );
};

export default AppComponents;
