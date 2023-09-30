import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import withAuth from '@/utils/withAuth';
import YouTubePlayer from '@/components/utils/Player';

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

  const goBack = () => {
    router.replace('/admin');
  }

  const extractVideoId = (link: string) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?]+)/;
    const match = link.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return '';
    }
  };

  return (
    <div className="my-5">
      {lectureData ? (
        <div>
          <div className="border-b border-black/20 mb-5">
            <p className="text-sm font-semibold">Lecture</p>
            <h2 className="text-2xl font-bold">{lectureData.lectureDate}</h2>
          </div>
          { lectureData.topicsCovered && 
            <div className="my-5">
              <h3 className="text-lg font-bold mb-2">Topics Covered</h3>
              <ol className="text-md pl-2">
                {lectureData.topicsCovered.map((topic, index) => (
                  <li key={index}>{`${index + 1}. ${topic}`}</li>
                ))}
              </ol>
            </div>
          }
          {lectureData.recordingLinks &&
            <div className="my-5">
              <h3 className="text-lg font-bold mb-2">Recorded Lectures</h3>
              <ol className="text-md flex flex-wrap justify-start">
                {lectureData.recordingLinks.map((link, index) => (
                  <li key={index} className='mr-5'>
                    <YouTubePlayer videoId={extractVideoId(link)} />
                  </li>
                ))}
              </ol>
            </div>
          }
          <button 
            className="border border-black/20 rounded-md py-2 px-6 hover:bg-green-500/60 transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 mt-2"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default withAuth(Material);
