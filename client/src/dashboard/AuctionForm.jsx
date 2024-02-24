import React, { useState } from "react";
import { TextInput, Label, Button, Datepicker } from "flowbite-react";
import { addBookInAuction } from "../api/auction";
import { useParams } from "react-router-dom";

const AuctionForm = () => {
  const { id } = useParams();
  // const [auctionDetails, setAuctionDetails] = useState({
  //   startDate: "",
  //   endDate: "",
  // });

  const [auctionData, setAuctionData] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  console.log("id", id);

  // const onChange = (event) => {
  //   console.log("event.target.value", event.target.value);
  //   setAuctionData((prev) => ({
  //     ...prev,
  //     [event.target.name]: event.target.value,
  //   }));
  // };

  const handleDatePickerChange = (date, key) => {
    setAuctionData((prev) => ({ ...prev, [key]: date }));
    console.log(date, key);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log book information along with the auction status
    const payload = {
      bookId: id,
      auctionStartDate: auctionData.startDate,
      auctionEndDate: auctionData.endDate,
    };

    try {
      const response = await addBookInAuction(payload);
      if (response.success) {
        alert(response.message || "Book in auction addedd Successfully");

        if (user?.userType == "USER") {
          navigate("/user/manage");
        } else {
          navigate("/admin/manage");
        }
      }
    } catch (error) {
      // alert(error.message);
      console.log(error);
    }
  };

  const onSubmit = () => {};

  console.log("auctionData", auctionData);

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <p className="text-3xl mb-4">Add Book into Auction</p>

      <div className="mb-2 block">
        <Label htmlFor="startDate" value="Auction Start Date" />
      </div>

      <Datepicker
        name="startDate"
        value={auctionData.startDate}
        onSelectedDateChanged={(date) =>
          handleDatePickerChange(date, "startDate")
        }
      />

      <div className="mb-2 block">
        <Label htmlFor="endDate" value="Auction End Date" />
      </div>

      <Datepicker
        name="endDate"
        value={auctionData.endDate}
        onSelectedDateChanged={(date) =>
          handleDatePickerChange(date, "endDate")
        }
      />
      <Button type="submit" className="mt-3" onClick={handleSubmit}>
        Save Auction
      </Button>
    </form>
  );
};

export default AuctionForm;
