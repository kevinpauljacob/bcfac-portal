import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import withAdminAuth from '@/utils/withAdminAuth';
import {IoCloseOutline} from 'react-icons/io5' 
import {BsCheck2} from 'react-icons/bs'

type Lecture = {
  id: string;
  lectureDate: string;
  topicsCovered: string[];
  recordingLinks: string[];
};

const Material = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined; 
  const [lectureData, setLectureData] = useState<Lecture | undefined>();
  const [lectureDate, setLectureDate] = useState<string>("");
  const [newTopic, setNewTopic] = useState<string>('');
  const [newRecordingLink, setNewRecordingLink] = useState<string>('');

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        if (id) {
          const lectureRef = doc(db, 'lectures', id);
          const lectureSnapshot = await getDoc(lectureRef);

          if (lectureSnapshot.exists()) {
            setLectureData(lectureSnapshot.data() as Lecture);
            setLectureDate(lectureSnapshot.data().lectureDate);
            
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching lecture data: ', error);
      }
    };

    if (id) {
      fetchLectureData();
    }
  }, [id]);

  useEffect((() => {
    console.log("Lecture Date: ", lectureDate);
    console.log("New Topic: ", newTopic);
    console.log("New Recording Link: ", newRecordingLink);
  }), [lectureDate, newRecordingLink, newTopic]);

  useEffect((() => {
    console.log("Lecture Data: ", lectureData)
  }), [lectureData]);

  const handleLectureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setLectureDate(newDate);

    if (lectureData) {
      const updatedLectureData: Lecture = {
        ...lectureData,
        lectureDate: newDate,
      };
      setLectureData(updatedLectureData);
    }
  };

  const updateLectureTopics = (updatedTopics: string[]) => {
    if (lectureData) {
      const updatedLectureData = { ...lectureData, topicsCovered: updatedTopics };
      setLectureData(updatedLectureData);
    }
  };

  const updateRecordingLinks = (updatedLinks: string[]) => {
    if (lectureData) {
      const updatedLectureData = { ...lectureData, recordingLinks: updatedLinks };
      setLectureData(updatedLectureData);
    }
  };

  const addTopic = () => {
    if (newTopic && lectureData) {
      const updatedTopics = [...lectureData.topicsCovered, newTopic];
      updateLectureTopics(updatedTopics);
      setNewTopic(''); // Clear the new topic input field
    }
  };

  const addRecordingLink = () => {
    if (lectureData) {
      const updatedLinks = [...lectureData.recordingLinks, newRecordingLink];
      updateRecordingLinks(updatedLinks);
      setNewRecordingLink(''); // Clear the new recording link input field
    }
  };

  // Delete a topic by index
  const deleteTopic = (index: number) => {
    if(lectureData){
      const updatedTopics = [...lectureData.topicsCovered];
      updatedTopics.splice(index, 1);
      updateLectureTopics(updatedTopics);
    }
  };

  const deleteRecordingLink = (index: number) => {
    if (lectureData) {
      const updatedLinks = [...lectureData.recordingLinks];
      updatedLinks.splice(index, 1);
      updateRecordingLinks(updatedLinks);
    }
  };

  const goBack = () => {
    router.replace('/admin');
  }

  const saveChangesToFirebase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && lectureData) {
        const lectureRef = doc(db, 'lectures', id);
  
        const updatedData = {
          lectureDate: lectureData.lectureDate,
          topicsCovered: lectureData.topicsCovered,
          recordingLinks: lectureData.recordingLinks,
        };
  
        await updateDoc(lectureRef, updatedData);
  
        console.log('Changes saved to Firebase!');
        router.replace(`/admin`);
      } else {
        console.error('id is undefined.');
      }
    } catch (error) {
      console.error('Error saving changes to Firebase: ', error);
    }
  };
  
  
  
  return (
    <div className="my-5">
      {lectureData ? (
        <div>
          <form>
            <div className="">
              <label htmlFor='Lecture' className="text-sm font-semibold block mb-2">Lecture</label>
              <input
                type="text"
                className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
                value={lectureDate}
                onChange={handleLectureDateChange}
              />
            </div>

            {/* topics covered editform */}
            <div className="my-5">
            <label className="text-md font-semibold mb-2">
              Topics Covered
            </label>
              <ol className="text-md">
                {lectureData.topicsCovered.map((topic, index) => (
                  <li key={index} className='flex items-center w-full mb-1'>
                    <input
                      type="text"
                      className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
                      value={topic}
                      onChange={(e) => {
                        const updatedTopics = [...lectureData.topicsCovered];
                        updatedTopics[index] = e.target.value;
                        updateLectureTopics(updatedTopics);
                      }}
                    />
                    <button type="button" className='border border-black/20 rounded-md px-3 py-3 hover:bg-red-400/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500' onClick={() => deleteTopic(index)}>
                      <IoCloseOutline />
                    </button>
                  </li>
                ))}
                <p className="text-sm font-semibold mt-3 mb-1">Add New Topic</p>
                <li className='flex items-center w-full'>
                  <input
                    type="text"
                    className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                  />
                  <button type="button" className='border border-black/20 rounded-md px-3 py-3 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500' onClick={addTopic}>
                    <BsCheck2 />
                  </button>
                </li>
              </ol>
            </div>

            {/* Video recording links */}
            <div className="my-5">
            <label className="text-md font-semibold mb-2">
              Recording Links
            </label>
              <ol className="text-md">
                {lectureData.recordingLinks.map((link, index) => (
                  <li key={index} className='flex items-center w-full mb-1'>
                    <input
                      type="text"
                      className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
                      value={link}
                      onChange={(e) => {
                        if (lectureData) {
                          const updatedLinks = [...lectureData.recordingLinks];
                          updatedLinks[index] = e.target.value;
                          updateRecordingLinks(updatedLinks);
                        }
                      }}
                    />
                    <button type="button" className='border border-black/20 rounded-md px-3 py-3 hover:bg-red-400/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500' onClick={() => deleteRecordingLink(index)}>
                      <IoCloseOutline />
                    </button>
                  </li>
                ))}
                <p className="text-sm font-semibold mt-3 mb-1">Add New Recording Link</p>
                <li className='flex items-center w-full'>
                  <input
                    type="text"
                    className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
                    value={newRecordingLink}
                    onChange={(e) => setNewRecordingLink(e.target.value)}
                  />
                  <button type="button" className='border border-black/20 rounded-md px-3 py-3 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500' onClick={addRecordingLink}>
                    <BsCheck2 />
                  </button>
                </li>
              </ol>
            </div>
            <div className='flex justify-between'>
              <button 
                className="border border-black/20 rounded-md py-2 px-6 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 mt-2"
                onClick={goBack}
              >
                Go Back
              </button>
              <button 
                className="border border-black/20 rounded-md py-2 px-6 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 mt-2"
                onClick={(e) => {saveChangesToFirebase(e)}}
              >
                Save
              </button>
          </div>
          </form>
          {/* Add rendering for Video Recordings, Slides, and Notes here */}
        </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default withAdminAuth(Material);