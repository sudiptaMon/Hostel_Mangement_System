import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GatepassRequestForm = () => {
  const [formData, setFormData] = useState({
    applyFor: 'Day out',
    outDate: '',
    outTime: '',
    inTime: '',
    nightOutOutDate: '',
    nightOutInDate: '',
    reason: '',
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    setMessage("");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isTimeValid = (outTime: string, inTime: string) => {
    const [outHour, outMinute] = outTime.split(':').map(Number);
    const [inHour, inMinute] = inTime.split(':').map(Number);

    const totalOutTime = outHour * 60 + outMinute;
    const totalInTime = inHour * 60 + inMinute;

    const fromTime = 9 * 60;
    const endTime = 17 * 60;


    return (
      totalOutTime >= fromTime &&
      totalOutTime <= endTime &&
      totalInTime >= fromTime &&
      totalInTime <= endTime &&
      totalOutTime < totalInTime
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();


    if (formData.applyFor === "Day out" && !isTimeValid(formData.outTime, formData.inTime)) {
      setMessage("Out Time must be earlier than In Time and both must be between 9:00 AM and 5:00 PM.");
      return;
    }


    let response = await axios.post("http://localhost:5000/Student/newgatepass", { formData }, { withCredentials: true })
    if (!response.data.added) {
      setMessage("Something Went Wrong");
      return;
    }
    navigate("/Student/gatepass");
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Gatepass Request</h2>
          {message && <div className="text-red-500 mb-4">{message}</div>}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Apply For:</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="applyFor"
                  value="Day out"
                  checked={formData.applyFor === 'Day out'}
                  onChange={handleInputChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">Day out</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="applyFor"
                  value="Night out"
                  checked={formData.applyFor === 'Night out'}
                  onChange={handleInputChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">Night out</span>
              </label>
            </div>
          </div>
          {formData.applyFor === 'Day out' ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Out Date:</label>
                <input
                  type="date"
                  name="outDate"
                  value={formData.outDate}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Out Time (In 24h format):</label>
                <input
                  type="time"
                  name="outTime"
                  value={formData.outTime}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">In Time (In 24h format):</label>
                <input
                  type="time"
                  name="inTime"
                  value={formData.inTime}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full border rounded"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {/* Night out form */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Out Date (Night out):</label>
                <input
                  type="date"
                  name="nightOutOutDate"
                  value={formData.nightOutOutDate}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">In Date (Night out):</label>
                <input
                  type="date"
                  name="nightOutInDate"
                  value={formData.nightOutInDate}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">In Time (i.e 7:00 PM):</label>
                <input
                  type="text"
                  name="inTime"
                  value={formData.inTime}
                  onChange={handleInputChange}
                  className="form-input mt-1 block w-full border rounded"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Leave Required Reason (Min. 10 Words):</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              minLength={10}
              required
              className="form-textarea mt-1 block w-full h-24 resize-none border"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default GatepassRequestForm;
