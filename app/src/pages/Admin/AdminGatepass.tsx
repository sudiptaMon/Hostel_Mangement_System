import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import axios from "axios";

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
    userid: string;
    permitBy?: string;
    srno: number;
    username: string;
    name: string;
    comment?: string;
}
export default function AdminGatepass() {
    const [gatepassData, setGatepassData] = useState<gatepassEntry[]>([]);
    const [comment, setComment] = useState("");

    
   

    useEffect(() => {
        const getGatepassData = async () => {
            let response = await axios.get("http://localhost:5000/Admin/gatepass",{withCredentials : true});
            if (!response.data) {
                return;
            }
            setGatepassData(response.data);
        }
        getGatepassData();
    }, [gatepassData]);

    const handleApprove = async (id: string, userid: string, outTime: string, inTime: string) => {
        
        

        try {
            let response = await axios.post("http://localhost:5000/Admin/approvegatepass", { id, userid, approved: true, comment }, { withCredentials: true });
            if (!response.data.done) {
                return;
            }
            let newGatepassData = gatepassData.filter((ele) => {
                return ele.id !== id;
            })
            setGatepassData(newGatepassData);
        } catch (err) {
            console.log(err);
        }
    }

    const handleReject = async (id: string, userid: string) => {
        try {
            let response = await axios.post("http://localhost:5000/Admin/rejectgatepass", { id, userid, approved: false, comment }, { withCredentials: true });
            if (!response.data.done) {
                return;
            }
            let newGatepassData = gatepassData.filter((ele) => {
                return ele.id !== id;
            })
            setGatepassData(newGatepassData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navigation />

            <div className="flex flex-col flex-1 p-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-red-600">Applied Gatepass</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Leave Type</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Username</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Leave From To</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Reason</th>
                                    <th className="border-b p-3 text-left font-semibold text-gray-700">Approve / Reject </th>
                                </tr>
                            </thead>
                            <tbody>

                                {gatepassData && gatepassData.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-100">
                                        <td className="border-b p-3">
                                            <span className={`px-2 py-1 rounded-full text-white font-bold bg-gray-500`}>
                                                {entry.applyFor}
                                            </span>
                                        </td>
                                        <td className={`border-b p-3 font-bold `}>
                                            {`${entry.name}(${entry.username})`}
                                        </td>
                                        {entry.applyFor === "Day out" ?
                                            <td className="border-b p-3">{`From ${entry.outDate}(${entry.outTime}) To  ${entry.outDate}(${entry.inTime})`}</td>
                                            : <td className="border-b p-3">{`From ${entry.nightOutOutDate}(${entry.outTime}) To ${entry.nightOutInDate} (${entry.inTime})`}</td>}
                                        <td className="border-b p-3">{entry.reason}</td>
                                        <td className="border-b p-3 flex flex-row gap-5">
                                            <button className="border-green-500 bg-transparent font-semibold text-green-700 rounded"
                                                onClick={async () => await handleApprove(entry.id, entry.userid, entry.outTime, entry.inTime)}>Approve</button>
                                            <button className="border-red-500 bg-transparent font-semibold text-red-700 rounded"
                                                onClick={async () => await handleReject(entry.id, entry.userid)}>Reject</button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
