import React from "react";
import moment from "moment";
import { Delete, DeleteIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Table = ({ filesBasedOnTeamId }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <td className="whitespace-nowrap px-10 py-4 font-medium text-gray-900">
              File Name
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Created At
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Edited
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Author
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Action
            </td>
          </tr>
        </thead>
        {filesBasedOnTeamId &&
          filesBasedOnTeamId !== undefined &&
          filesBasedOnTeamId.map((file) => (
            <tbody
              className="divide-y divide-gray-200 cursor-pointer"
              key={file?._id}
            >
              <tr
                className="odd:bg-gray-50"
                onClick={() =>
                  navigate(`/workspace/${file?.teamId}/${file?._id}`)
                }
              >
                <td className="whitespace-nowrap px-10 py-4 font-medium text-gray-900">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file.createdAt).fromNow()}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file.updatedAt).fromNow()}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex items-center">
                  <img
                    src={file?.userId.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full "
                  />
                  <p className="ml-2">{file.userId.username}</p>
                </td>
                {/* ==========================delete a existing file from the database ============================== */}
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                  <Delete />
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default Table;
