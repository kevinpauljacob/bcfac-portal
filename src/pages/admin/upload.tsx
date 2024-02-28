import React, { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { v4 } from "uuid";
import withAdminAuth from "@/utils/withAdminAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Timestamp } from "firebase/firestore";

const Upload = () => {
  const [lectureDate, setLectureDate] = useState<string>("");
  const [dateOfLecture, setDateOfLecture] = useState<Date | null>(null);
  const [topicsCovered, setTopicsCovered] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [recordingLinks, setRecordingLinks] = useState<string[]>([]);
  const [recordingLink, setRecordingLink] = useState<string>("");
  const [fileUploads, setFileUploads] = useState<File[]>([]);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFileUploads(Array.from(files));
    }
  };

  useEffect(() => {
    // console.log(fileUploads);
  }, [fileUploads]);

  const submitFormData = async (e: React.FormEvent) => {
    e.preventDefault();

    const lectureId = v4();
    const lectureFolderRef = ref(storage, `lecture_materials/${lectureId}`);
    const fileUploadPromises = fileUploads.map((file) => {
      const fileName = file.name;
      const fileRef = ref(lectureFolderRef, fileName);
      return uploadBytes(fileRef, file, {
        customMetadata: { fileName: fileName },
      });
    });

    try {
      await Promise.all(fileUploadPromises);

      const downloadUrls = await Promise.all(
        fileUploads.map(async (file) => {
          const fileName = file.name;
          const fileRef = ref(lectureFolderRef, fileName);
          return await getDownloadURL(fileRef);
        })
      );

      const fileNamesWithUrls = fileUploads.map((file, index) => ({
        fileName: file.name,
        fileUrl: downloadUrls[index],
      }));

      const parsedDate = dateOfLecture ? new Date(dateOfLecture) : null;
      const dateTimestamp = parsedDate ? Timestamp.fromDate(parsedDate) : null;

      const lectureData = {
        dateOfLecture: dateTimestamp,
        lectureDate,
        topicsCovered,
        recordingLinks,
        lectureId,
        fileNames: fileNamesWithUrls,
      };

      const docRef = await addDoc(collection(db, "lectures"), lectureData);
      // console.log("Document written with ID: ", docRef.id);

      setDateOfLecture(null);
      setLectureDate("");
      setTopicsCovered([]);
      setRecordingLinks([]);

      // Show success toast notification
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      // Show error toast notification
      toast.error("Error uploading file. Please try again.");
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
        <div>
          <label className="text-md font-semibold mb-1">Date of Lecture</label>
          <input
            className=""
            type="date"
            id="dateOfLecture"
            value={
              dateOfLecture ? dateOfLecture.toISOString().split("T")[0] : ""
            }
            onChange={(e) => setDateOfLecture(new Date(e.target.value))}
          />
        </div>
        <div className="flex flex-col my-2">
          <label className="text-md font-semibold mb-1">Topics Covered</label>
          <div className="flex items-center w-full">
            <input
              className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
              type="text"
              placeholder="Enter the topics covered"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            />
            <button
              className="border border-black/20 rounded-md px-3 py-3 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500"
              onClick={handleAddTopic}
            >
              <BsCheck2 />
            </button>
          </div>
          <ul>
            {topicsCovered.map((topic, index) => (
              <li key={index} className="flex items-center w-full">
                <span className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 my-2 w-full mr-2">
                  {index + 1}&nbsp;.&nbsp;{topic}
                </span>
                <button
                  className="border border-black/20 rounded-md px-3 py-3 hover:bg-red-400/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500"
                  onClick={(e) => handleRemoveTopic(e, index)}
                >
                  <IoCloseOutline />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col my-2">
          <label className="text-md font-semibold mb-1">Recording Links</label>
          <div className="flex items-center w-full">
            <input
              className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
              type="text"
              placeholder="Enter the recording links"
              value={recordingLink}
              onChange={(e) => {
                setRecordingLink(e.target.value);
              }}
            />
            <button
              className="border border-black/20 rounded-md px-3 py-3 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500"
              onClick={handleAddLink}
            >
              <BsCheck2 />
            </button>
          </div>
          <ul>
            {recordingLinks.map((link, index) => (
              <li key={index} className="flex items-center w-full">
                <span className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 my-2 w-full mr-2">
                  {index + 1}&nbsp;.&nbsp;{link}
                </span>
                <button
                  className="border border-black/20 rounded-md px-3 py-3 hover:bg-red-400/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500"
                  onClick={(e) => handleRemoveLink(e, index)}
                >
                  <IoCloseOutline />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col my-2">
          <label className="text-md font-semibold mb-1">File Upload</label>
          <input
            className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2"
            type="file"
            placeholder="Enter the ppt"
            multiple
            name="files[]"
            onChange={handleFileUpload}
          />
        </div>
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
