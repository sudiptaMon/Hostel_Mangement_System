import React from "react";
import { Link } from "react-router-dom";

type propType = {
  service: string;
  description: string;
  for: string;
  role?:string
};

export default class Services extends React.Component<propType> {
  render() {
    return (
      <Link to={`/${this.props.role}/${this.props.for}`} className="group">
        <div className="w-64 h-34 p-6 bg-gradient-to-r from-gray-200 via-gray-100 to-white rounded-3xl transition-transform transform hover:scale-95 shadow-lg hover:shadow-xl cursor-pointer">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-extrabold text-gray-800 break-words">
              {this.props.service}
            </span>
            <span className="text-base font-bold text-gray-600">
              {this.props.description}
            </span>
          </div>
         
        </div>
      </Link>
    );
  }
}
