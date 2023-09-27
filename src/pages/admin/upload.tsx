import React, { useState } from 'react'
import {BsCheck2} from 'react-icons/bs'
import {IoCloseOutline} from 'react-icons/io5'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase'
import withAdminAuth from '@/utils/withAdminAuth';

const Upload = () => {
  const [lectureDate, setLectureDate] = useState<string>('');
  const [topicsCovered, setTopicsCovered] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>('');
  const [recordingLinks, setRecordingLinks] = useState<string[]>([]);
  const [recordingLink, setRecordingLink] = useState<string>('')
  const [pptUploads, setPptUploads] = useState<string[]>([]);

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() !== '') {
      setTopicsCovered((prevTopics) => [...prevTopics, topic.trim()]);
      setTopic(''); 
    }
  }

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordingLink.trim() !== '') {
      setRecordingLinks((prevLinks) => [...prevLinks, recordingLink.trim()]);
      setRecordingLink(''); 
    }
  }

  const handleRemoveTopic = (e: React.FormEvent, indexToRemove: number) => {
    e.preventDefault();
    const updatedTopics = topicsCovered.filter((_, index) => index !== indexToRemove);
    setTopicsCovered(updatedTopics);
  }

  const handleRemoveLink = (e: React.FormEvent, indexToRemove: number) => {
    e.preventDefault();
    const updatedLinks = recordingLinks.filter((_, index) => index !== indexToRemove);
    setRecordingLinks(updatedLinks);
  }

  const submitFormData = async (e: React.FormEvent) => {
    e.preventDefault();
    const lectureData = {
      lectureDate,
      topicsCovered,
      recordingLinks,
    };

    try {
      const docRef = await addDoc(collection(db, 'lectures'), lectureData);
      console.log('Document written with ID: ', docRef.id);

      setLectureDate('');
      setTopicsCovered([]);
      setRecordingLinks([]);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  return (
    <div className="my-5">
        <h2 className="text-2xl font-bold">
          Add New Lecture Material
        </h2>
        <form className='my-5'>
          <div className="flex flex-col my-2">
            <label className="text-md font-semibold mb-1">
              Lecture Date
            </label>
            <input 
              className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2" 
              type="text" 
              placeholder="Enter the lecture date"
              value={lectureDate}
              onChange={(e) => {setLectureDate(e.target.value)}}
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-md font-semibold mb-1">
              Topics Covered
            </label>
            <div className="flex items-center w-full">
              <input 
                className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2" 
                type="text" 
                placeholder="Enter the topics covered"
                value={topic}
                onChange={(e) => {setTopic(e.target.value)}}
              />
              <button className="border border-black/20 rounded-md px-3 py-3 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500" onClick={handleAddTopic}><BsCheck2/></button>
            </div>
            <ul>
              {topicsCovered.map((topic, index) => (
                <li key={index} className="flex items-center w-full">
                  <span className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 my-2 w-full mr-2">
                    {index + 1}&nbsp;.&nbsp;{topic}
                  </span>
                  <button 
                    className="border border-black/20 rounded-md px-3 py-3 hover:bg-red-400/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500" 
                    onClick={(e) => handleRemoveTopic(e, index)}>
                      <IoCloseOutline/>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col my-2">
            <label className="text-md font-semibold mb-1">
              Recording Links
            </label>
            <div className="flex items-center w-full">
              <input 
                className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2" 
                type="text" 
                placeholder="Enter the recording links"
                value={recordingLink}
                onChange={(e) => {setRecordingLink(e.target.value)}}
              />
              <button 
                className="border border-black/20 rounded-md px-3 py-3 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500" 
                onClick={handleAddLink}>
                  <BsCheck2/>
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
                    onClick={(e) => handleRemoveLink(e, index)}>
                      <IoCloseOutline/>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button 
            className="border border-black/20 rounded-md py-2 px-6 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 mt-2"
            onClick={(e) => {submitFormData(e)}}
          >
            Save
          </button>
        </form>
    </div>
  )
}

export default withAdminAuth(Upload);