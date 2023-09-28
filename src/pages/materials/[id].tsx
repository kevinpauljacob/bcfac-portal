import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import withAuth from '@/utils/withAuth';

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

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        if (id) {
          const lectureRef = doc(db, 'lectures', id);
          const lectureSnapshot = await getDoc(lectureRef);

          if (lectureSnapshot.exists()) {
            setLectureData(lectureSnapshot.data() as Lecture);
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

  return (
    <div className="my-5">
      {lectureData ? (
        <div>
          <div className="border-b border-black/20 mb-5">
            <p className="text-sm font-semibold">Lecture</p>
            <h2 className="text-2xl font-bold">{lectureData.lectureDate}</h2>
          </div>
          <div className="my-5">
            <h3 className="text-lg font-bold mb-2">Topics Covered</h3>
            <ol className="text-md pl-2">
              {lectureData.topicsCovered.map((topic, index) => (
                <li key={index}>{`${index + 1}. ${topic}`}</li>
              ))}
            </ol>
          </div>
          <div className="my-5">
            <h3 className="text-lg font-bold mb-2">Recorded Lectures</h3>
            <ol className="text-md pl-2">
              {lectureData.recordingLinks.map((link, index) => (
                <li key={index}>{`${index + 1}. ${link}`}</li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default withAuth(Material)