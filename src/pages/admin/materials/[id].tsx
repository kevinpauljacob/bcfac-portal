import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 } from "uuid";
import withAdminAuth from '@/utils/withAdminAuth';
import {IoCloseOutline} from 'react-icons/io5' 
import {BsCheck2, BsTrash} from 'react-icons/bs'
import { BiDownload } from 'react-icons/bi';

type Lecture = {
  id: string;
  lectureDate: string;
  lectureId: string;
  topicsCovered: string[];
  recordingLinks: string[];
  fileNames: { fileName: string; fileUrl: string }[];
};

const Material = () => {
  const router = useRouter();
  const id = router.query.id as string | undefined; 
  const [lectureData, setLectureData] = useState<Lecture | undefined>();
  const [lectureDate, setLectureDate] = useState<string>("");
  const [lectureId, setLectureId] = useState<string>("");
  const [newTopic, setNewTopic] = useState<string>('');
  const [newRecordingLink, setNewRecordingLink] = useState<string>('');
  const [fileUploads, setFileUploads] = useState<File[]>([]);
  const [files, setFiles] = useState<{ fileName: string; fileUrl: string }[]>([]);

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        if (id) {
          const lectureRef = doc(db, 'lectures', id);
          const lectureSnapshot = await getDoc(lectureRef);

          if (lectureSnapshot.exists()) {
            setLectureData(lectureSnapshot.data() as Lecture);
            setLectureDate(lectureSnapshot.data().lectureDate);
            setLectureId(lectureSnapshot.data().lectureId);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFileUploads(Array.from(files));
    }
  };  

  const goBack = () => {
    router.replace('/admin');
  }

  const deleteLecture = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (id) {
        const lectureRef = doc(db, 'lectures', id);
        await deleteDoc(lectureRef);
        console.log('Document deleted from Firebase!');
        router.replace('/admin');
      } else {
        console.error('id is undefined.');
      }
    } catch (error) {
      console.error('Error deleting document from Firebase: ', error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      if (lectureData) {
        const lectureId = lectureData.lectureId;
        const folderRef = ref(storage, `lecture_materials/${lectureId}`);
        
        try {
          const listResult = await listAll(folderRef);
          const downloadUrls = await Promise.all(
            listResult.items.map(async (item) => {
              return await getDownloadURL(item);
            })
          );

          const fileNamesWithUrls = lectureData.fileNames.map((fileNameObj, index) => ({
            fileName: fileNameObj.fileName,
            fileUrl: downloadUrls[index],
          }));

          setFiles(fileNamesWithUrls);
        } catch (error) {
          console.error('Error fetching files: ', error);
        }
      }
    };

    fetchFiles();
  }, [lectureData]);

  const saveChangesToFirebase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && lectureData) {
        const lectureID = lectureId !== "" ? lectureId : v4();
        const lectureRef = doc(db, 'lectures', id);
        const lectureFolderRef = ref(storage, `lecture_materials/${lectureId}`);
  
        await Promise.all(fileUploads.map((file) => {
          const fileName = file.name;
          const fileRef = ref(lectureFolderRef, fileName);
          return uploadBytes(fileRef, file, { customMetadata: { fileName: fileName } });
        }))
  
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

        const updatedFileNames = [
          ...(lectureData.fileNames || []), 
          ...fileNamesWithUrls,
        ];
  
        const updatedData = {
          lectureDate: lectureData.lectureDate,
          topicsCovered: lectureData.topicsCovered,
          recordingLinks: lectureData.recordingLinks,
          lectureId: lectureID,
          fileNames: updatedFileNames,
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
  
  const handleDeleteFile = async (fileToRemove: string) => {
    try {
      if (!id) {
        console.error('id is undefined.');
        return;
      }
  
      if (lectureData) {
        const lectureId = lectureData.lectureId;
        const fileRef = ref(storage, `lecture_materials/${lectureId}/${fileToRemove}`);
  
        await deleteObject(fileRef);
  
        const updatedFiles = [...files]; // Create a copy of the files array
        const indexToRemove = updatedFiles.findIndex((file) => file.fileName === fileToRemove);
  
        if (indexToRemove !== -1) {
          updatedFiles.splice(indexToRemove, 1); // Remove the file at the found index
        }
  
        const lectureRef = doc(db, 'lectures', id);
        await updateDoc(lectureRef, { fileNames: updatedFiles });
  
        setFiles(updatedFiles); // Update the state with the modified files array
      }
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };
  

  return (
    <div className="my-5">
      <h2 className="text-lg font-semibold border-b border-gray-600/20 mb-5">Edit Lecture Data</h2>
      {lectureData ? (
        <div>
          <form>
            <div className="bg-gray-300/20 rounded-md p-1.5 shadow-md">
              <label htmlFor='Lecture' className="text-md font-semibold block mb-2">Lecture</label>
              <input
                type="text"
                className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
                value={lectureDate}
                onChange={handleLectureDateChange}
              />
            </div>
            { lectureData.topicsCovered && 
              <div className="bg-gray-300/20 rounded-md p-1.5 shadow-md my-5">
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
                      <button type="button" className='border border-black/20 rounded-md px-3 py-3 bg-white hover:bg-red-400/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500' onClick={() => deleteTopic(index)}>
                        <IoCloseOutline />
                      </button>
                    </li>
                  ))}
                  <p className="text-xs font-semibold mt-3 mb-1">Add New Topic</p>
                  <li className='flex items-center w-full'>
                    <input
                      type="text"
                      className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                    />
                    <button type="button" className='border border-black/20 rounded-md px-3 py-3 bg-white hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500' onClick={addTopic}>
                      <BsCheck2 />
                    </button>
                  </li>
                </ol>
              </div>
            }
            { lectureData.recordingLinks &&
              <div className="bg-gray-300/20 rounded-md p-1.5 shadow-md  my-5">
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
                      <button type="button" className='border border-black/20 bg-white rounded-md px-3 py-3 hover:bg-red-400/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500' onClick={() => deleteRecordingLink(index)}>
                        <IoCloseOutline />
                      </button>
                    </li>
                  ))}
                  <p className="text-xs font-semibold mt-3 mb-1">Add New Recording Link</p>
                  <li className='flex items-center w-full'>
                    <input
                      type="text"
                      className="border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2 w-full mr-2"
                      value={newRecordingLink}
                      onChange={(e) => setNewRecordingLink(e.target.value)}
                    />
                    <button type="button" className='border border-black/20 bg-white rounded-md px-3 py-3 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500' onClick={addRecordingLink}>
                      <BsCheck2 />
                    </button>
                  </li>
                </ol>
              </div>
            }
            <div className="bg-gray-300/20 rounded-md p-1.5 shadow-md my-5">
              {files.length > 0 && (
                <div className="">
                  <h3 className="text-md font-semibold mb-2">Materials</h3>
                  <ul className="text-md flex">
                    {files.map((file, index) => (
                      <li key={index} className="mr-2 mb-2">
                        <div className="flex items-center bg-gray-600/10 rounded-md p-2">
                          <span className="text-sm font-medium mr-2">{file.fileName}</span>
                          <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className='mr-2'><BiDownload/></a>
                          <span onClick={() => {handleDeleteFile(file.fileName)}} className="transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300 hover:text-red-600"><BsTrash/></span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                )
              }  
              <div className="flex flex-col mb-5">
                <label className="text-xs font-semibold my-1">Upload new File</label>
                <input
                  className="border border-black/20 bg-white rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2"
                  type="file"
                  placeholder="Enter the ppt"
                  multiple
                  name="files[]"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <button 
                className="text-sm font-semibold border border-black/20 rounded-md py-2 px-6 hover:bg-gray-400/30 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 mt-2"
                onClick={goBack}
              >
                Go Back
              </button>
              <div>
                <button
                  className="text-sm font-semibold border border-black/20 rounded-md py-2 px-6 hover:bg-red-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 mt-2 mr-3"
                  onClick={(e) => deleteLecture(e)}
                >
                  Delete
                </button>
                <button 
                  className="text-sm font-semibold border border-black/20 rounded-md py-2 px-6 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 mt-2"
                  onClick={(e) => {saveChangesToFirebase(e)}}
                >
                  Save
                </button>
              </div>
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