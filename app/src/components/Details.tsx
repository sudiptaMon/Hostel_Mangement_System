import React from "react";
import { userType } from "../App";

type PropsType = {
  userDetails: userType | null;
};

export default class Details extends React.Component<PropsType> {
  render() {
    const { userDetails } = this.props;

    if (!userDetails) {
      return (
        <div className="flex justify-center items-center my-5 mx-auto text-red-500">
          No user details available.
        </div>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row gap-5 bg-white w-[90%] h-fit p-4 items-center justify-center my-5 mx-auto rounded-md shadow-lg">
        
        {/* <img
          src={userDetails.profilePicture || "default-image.jpg"}
          alt="User"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        /> */}
        <div className="flex flex-col gap-2">
          <header className="text-2xl font-bold">
            {userDetails.name || "No Name Provided"}
          </header>
          <div className="grid grid-cols-2 gap-4 mt-2 text-gray-600">
            <div>
              <span className="font-semibold">Username: </span>
              {userDetails.username || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Email: </span>
              {userDetails.email || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Room: </span>
              {userDetails.room || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Batch: </span>
              {userDetails.batch || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Role: </span>
              {userDetails.role || "N/A"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
