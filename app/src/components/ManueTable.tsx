import {MenuItem} from "../types/Types"


type MessMenuProps = {
  messMenu: MenuItem[];
};

export default function ManueTable({messMenu} : MessMenuProps){
    if (!messMenu || messMenu.length === 0) {
    return (
      <div className="flex justify-center items-center my-5 mx-auto text-red-500">
        No mess menu available.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white w-[90%] p-4 my-5 mx-auto rounded-md shadow-lg">
      <header className="text-2xl font-bold text-center text-gray-800 mb-4">
        Weekly Mess Menu
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left text-gray-700 font-semibold">
                Day
              </th>
              <th className="px-4 py-2 border text-left text-gray-700 font-semibold">
                Breakfast
              </th>
              <th className="px-4 py-2 border text-left text-gray-700 font-semibold">
                Lunch
              </th>
              <th className="px-4 py-2 border text-left text-gray-700 font-semibold">
                Tiffin
              </th>
              <th className="px-4 py-2 border text-left text-gray-700 font-semibold">
                Dinner
              </th>
            </tr>
          </thead>
          <tbody>
            {messMenu.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-2 border font-medium text-gray-800">
                  {item.day}
                </td>
                <td className="px-4 py-2 border text-gray-600">
                  {item.breakfast}
                </td>
                <td className="px-4 py-2 border text-gray-600">
                  {item.lunch}
                </td>
                <td className="px-4 py-2 border text-gray-600">
                  {item.tiffin}
                </td>
                <td className="px-4 py-2 border text-gray-600">
                  {item.dinner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}