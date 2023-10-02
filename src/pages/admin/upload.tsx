import React, { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import withAdminAuth from "@/utils/withAdminAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {
  const [lectureDate, setLectureDate] = useState<string>("");
  const [topicsCovered, setTopicsCovered] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [recordingLinks, setRecordingLinks] = useState<string[]>([]);
  const [recordingLink, setRecordingLink] = useState<string>("");
  const [pptUploads, setPptUploads] = useState<File[]>([]);

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() !== "") {
      setTopicsCovered((prevTopics) => [...prevTopics, topic.trim()]);
      setTopic("");
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordingLink.trim() !== "") {
      setRecordingLinks((prevLinks) => [...prevLinks, recordingLink.trim()]);
      setRecordingLink("");
    }
  };

  const handleRemoveTopic = (e: React.FormEvent, indexToRemove: number) => {
    e.preventDefault();
    const updatedTopics = topicsCovered.filter(
      (_, index) => index !== indexToRemove
    );
    setTopicsCovered(updatedTopics);
  };

  const handleRemoveLink = (e: React.FormEvent, indexToRemove: number) => {
    e.preventDefault();
    const updatedLinks = recordingLinks.filter(
      (_, index) => index !== indexToRemove
    );
    setRecordingLinks(updatedLinks);
  };

  const submitFormData = async (e: React.FormEvent) => {
    e.preventDefault();
    const lectureData = {
      lectureDate,
      topicsCovered,
      recordingLinks,
    };

    try {
      const docRef = await addDoc(collection(db, "lectures"), lectureData);
      console.log("Document written with ID: ", docRef.id);

      setLectureDate("");
      setTopicsCovered([]);
      setRecordingLinks([]);

      // Show success toast notification
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
      // Show error toast notification
      toast.error('Error uploading file. Please try again.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPptUploads(Array.from(files));
    }
  };

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold">Add New Lecture Material</h2>
      <form className="my-5">
        <div className="flex flex-col my-2">
          <label className="text-md font-semibold mb-1">Lecture Date</label>
          <input
            className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2"
            type="text"
            placeholder="Enter the lecture date"
            value={lectureDate}
            onChange={(e) => {
              setLectureDate(e.target.value);
            }}
          />
        </div>
        {/* ... (existing code) */}
        <button
          className="border border-black/20 rounded-md py-2 px-6 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 mt-2"
          onClick={(e) => {
            submitFormData(e);
          }}
        >
          Save
        </button>

        {/* React-toastify container for displaying notifications */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </form>
    </div>
  );
};

export default withAdminAuth(Upload);
