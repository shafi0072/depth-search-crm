import { inboxData } from "@/src/constant/inboxData";
import React, { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { baseUrl } from "@/src/constant/server";

const style = {
  position: "absolute",
  top: "30%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  //   width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Inbox = () => {
  const [open, setOpen] = React.useState(false);
  const [modalDataId, setModalDataId] = useState("");
  const [inboxData, setInboxData] = useState([]);
  const [reply, setReply] = useState(false);
  const handleOpen = (id) => {
    setModalDataId(id);
    setReply(false);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // fetch contact data
  useEffect(() => {
    fetch(`${baseUrl}/contact`)
      .then((res) => res.json())
      .then((data) => setInboxData(data?.data));
  }, [inboxData]);

  // handle reply 
  const handleReply = (e)=>{
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const message = form.message.value;
    const data = {name:modalData?.name,email:modalData?.email,subject,message}
    fetch(`${baseUrl}/replay`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
      
    })
    .catch(err=>console.log(err))
    handleClose()
  }

  const modalData = inboxData.find((data) => data._id === modalDataId);
  console.log(modalData);

  return (
    <div className="border border-gray-300 ">
      <div>
        {inboxData.map((data, index) => (
          <div
            className="flex cursor-pointer items-center border-y py-2  px-4 border-gray-400"
            key={index}
          >
            <p className="w-[250px]">{data?.name}</p>
            <p>{data?.companyName}</p>
            <span className="mx-2">-</span>
            <p>{data?.message.slice(0, 50)}</p>
            <div className="ms-auto space-x-3">
              <ReplyOutlinedIcon onClick={() => handleOpen(data._id)} />
              <DeleteForeverOutlinedIcon className=" cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="mt-32 bg-black w-10/12 md:w-8/12 lg:w-[700px] mx-auto p-12 ">
          {reply === true ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Reply</h2>
              <form onSubmit={handleReply}>
                <input
                  type="text"
                  name="subject"
                  placeholder="subject"
                  className="bg-transparent border py-2 w-full ps-4"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  id=""
                  cols="30"
                  rows="10"
                  className="bg-transparent border py-2 w-full ps-4 mt-4"
                ></textarea>
                <div className="flex justify-end mt-6">
                  <button className="px-4 border py-2 rounded" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-3">
              <p>Name: {modalData?.name}</p>
              <p>Company Name: {modalData?.companyName}</p>
              <p>Email: {modalData?.email}</p>
              <p>Phone: {modalData?.number}</p>
              <p>Message:</p>
              <p>{modalData?.message}</p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setReply(true)}
                  className="px-4 border py-2 rounded"
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Inbox;
