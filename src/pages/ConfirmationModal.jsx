import { Link } from "react-router-dom";

const ConfirmationModal = ({ showModal, onConfirm, message, Over }) => {
    if (!showModal) return null;
  
    return (
      <div className="fixed inset-1 bg-black bg-opacity-0 flex justify-center items-center z-20">
        <div className="bg-white bg-opacity-95 text-black p-6 rounded-md shadow-md max-w-lg w-full mb-20">
          <p>{message}</p>
          <h3 className="text-xl mb-4">{Over ? "Do you want to play again?" :"Do you want to continue?"}</h3>
          <div className="mt-4 flex justify-around">
            
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
              onClick={onConfirm}
            >
              Yes
            </button>
            <Link
              className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-3 rounded-md"
              to = "/"
            >
              No
            </Link> 
          </div>
        </div>
      </div>
    );
  };
  export default ConfirmationModal;