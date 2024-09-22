import { useState } from "react";
import Navigation from "../../components/Navigation";

interface MenuItem {
    dayNo: string;
    day: string;
    breakfast: string;
    lunch: string;
    tiffin: string;
    dinner: string;
}

export default function AddMenu() {
    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    const [formData, setFormData] = useState<MenuItem>({
        dayNo: "",
        day: "",
        breakfast: "",
        lunch: "",
        tiffin: "",
        dinner: ""
    });
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<number | null>(null); 

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    
    const toggleForm = (): void => {
        setIsFormOpen(!isFormOpen);
        setEditIndex(null); 
        setFormData({ dayNo: "", day: "", breakfast: "", lunch: "", tiffin: "", dinner: "" });
    };

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (editIndex !== null) {
            
            const updatedMenu = menuData.map((item, index) =>
                index === editIndex ? formData : item
            );
            setMenuData(updatedMenu);
        } else {
            
            setMenuData([...menuData, formData]);
        }
        toggleForm(); 
    };

    
    const handleEdit = (index: number): void => {
        setEditIndex(index);
        setFormData(menuData[index]);
        setIsFormOpen(true);
    };

    
    const handleDelete = (index: number): void => {
        const filteredMenu = menuData.filter((_, i) => i !== index);
        setMenuData(filteredMenu);
    };

    return (
        <>
            <div className="min-h-screen flex flex-col gap-10">
                <Navigation />
                <div className="flex justify-end mr-5">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={toggleForm}
                    >
                        {isFormOpen ? "Close Form" : "Add Menu"}
                    </button>
                </div>

                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="dayNo"
                                placeholder="Day No"
                                value={formData.dayNo}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="day"
                                placeholder="Day (e.g., Monday)"
                                value={formData.day}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="breakfast"
                                placeholder="Breakfast"
                                value={formData.breakfast}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="lunch"
                                placeholder="Lunch"
                                value={formData.lunch}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="tiffin"
                                placeholder="Tiffin"
                                value={formData.tiffin}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="dinner"
                                placeholder="Dinner"
                                value={formData.dinner}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
                        >
                            {editIndex !== null ? "Update Menu" : "Add Menu"}
                        </button>
                    </form>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border-b p-3 text-left font-semibold text-gray-700">No.</th>
                                <th className="border-b p-3 text-left font-semibold text-gray-700">Day</th>
                                <th className="border-b p-3 text-left font-semibold text-gray-700">Breakfast</th>
                                <th className="border-b p-3 text-left font-semibold text-gray-700">Lunch</th>
                                <th className="border-b p-3 text-left font-semibold text-gray-700">Tiffin</th>
                                <th className="border-b p-3 text-left font-semibold text-gray-700">Dinner</th>
                                <th className="border-b p-3 text-left font-semibold text-gray-700">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuData.map((item, index) => (
                                <tr key={index}>
                                    <td className="border-b p-3">{item.dayNo}</td>
                                    <td className="border-b p-3">{item.day}</td>
                                    <td className="border-b p-3">{item.breakfast}</td>
                                    <td className="border-b p-3">{item.lunch}</td>
                                    <td className="border-b p-3">{item.tiffin}</td>
                                    <td className="border-b p-3">{item.dinner}</td>
                                    <td className="border-b p-3 space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => handleEdit(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
            </div>
        </>
    );
}
