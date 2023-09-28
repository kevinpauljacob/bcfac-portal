import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import withAdminAuth from '@/utils/withAdminAuth';

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
          {/* Add rendering for Video Recordings, Slides, and Notes here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default withAdminAuth(Material);