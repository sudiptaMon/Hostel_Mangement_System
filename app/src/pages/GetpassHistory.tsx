import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation';
import axios from 'axios';

// const gatepassData = [
//     {
//         id: 1,
//         leaveType: 'NIGHT OUT',
//         status: 'APPROVED',
//         location: 'BOSE BOYS (BOYS)',
//         room: '312-',
//         leaveFrom: '03-JUN-2024 (8:00)',
//         leaveTo: '07-JUL-2024 (12:00)',
//         reason: 'VISITING HOME AFTER THE COMPLETION OF SEMESTER',
//         approvedBy: 'PRADEEP KUMAR',
//         contact: '',
//     }
// ];

type gatepassEntry = {
    applyFor: string;
    outDate: string;
    outTime: string;
    inTime: string;
    nightOutOutDate?: string;
    nightOutInDate?: string;
    reason: string;
    todayDate: string;
    id: string;
    status: string;
    permitBy?: string;
    srno: number;
    comment?:string;
}
const GatepassHistory = () => {
    const [gatepassData, setGatepassData] = useState<gatepassEntry[]>([]);

    useEffect(() => {
        const getGatepassData = async () => {
            try {
                let response = await axios.get("http://localhost:5000/Student/gatepass-history", { withCredentials: true });
                if (!response) {
                    return;
                }
                console.log(response);
                let history = response.data.gatepasses;
                setGatepassData(history);
            } catch (err) {
                console.log(err);
            }
        }
        getGatepassData();
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navigation />

            <div className="flex flex-col flex-1 p-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-red-600">Gatepass History</h2>
                        <Link to="/Student/apply-gatepass">
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Apply Gatepass
                            </button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">#</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Leave Type</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Status</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Date</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Leave From To</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Reason</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Approved / Reject By (Warden)</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Approved Comments</th>
                                </tr>
                            </thead>
                            <tbody>

                                {gatepassData && gatepassData.map((entry) => (
                                    <tr key={entry.srno} className="hover:bg-gray-100">
                                        <td className="border-b p-3">{entry.srno}</td>
                                        <td className="border-b p-3">
                                            <span className={`px-2 py-1 rounded-full text-white font-bold bg-gray-500`}>
                                                {entry.applyFor}
                                            </span>
                                        </td>
                                        <td className={`border-b p-3 font-bold ${entry.status === 'APPROVED' ? 'text-green-600' :
                                                entry.status === 'PENDING' ? 'text-yellow-600' :
                                                    entry.status === 'REJECTED' ? 'text-red-600' : ''
                                            }`}>
                                            {entry.status}
                                        </td>
                                        <td className="border-b p-3">{entry.todayDate   }</td>
                                        {entry.applyFor === "Day out" ?
                                            <td className="border-b p-3">{`From ${entry.outDate}(${entry.outTime}) To  ${entry.outDate}(${entry.inTime})`}</td>
                                            : <td className="border-b p-3">{`From ${entry.nightOutOutDate}(${entry.outTime}) To ${entry.nightOutInDate} (${entry.inTime})`}</td>}
                                        
                                        <td className="border-b p-3">{entry.reason}</td>
                                        <td className="border-b p-3">{entry.permitBy ? `${entry.permitBy} ` : '---'}</td>
                                        <td className="border-b p-3">{entry.comment}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GatepassHistory;
