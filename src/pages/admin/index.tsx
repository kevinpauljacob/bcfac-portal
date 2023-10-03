import React, { useState, useEffect} from 'react'
import Search from '@/components/utils/Search'
import AdminCard from '@/components/dashboard/AdminCard'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import withAdminAuth from '@/utils/withAdminAuth';

type Lecture = {
  id: string;
  lectureDate: string;
  topicsCovered: string[];
  recordingLinks: string[];
};

const Dashboard = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lectures'));
        const lectureData: Lecture[] = [];
        querySnapshot.forEach((doc) => {
          lectureData.push({ id: doc.id, ...doc.data() } as Lecture);
        });
        setLectures(lectureData);
        console.log(lectureData);
      } catch (error) {
        console.error('Error fetching lectures: ', error);
      }
    };

    fetchLectures();
  }, []); 

  return (
    <div>
        <Search/>
        <section>
            <h2 className="text-2xl font-bold">
                Course Materials
            </h2>
            {lectures.map((lecture) => (
              <AdminCard key={lecture.id} lecture={lecture} />
            ))}
        </section>
    </div>
  )
}

export default withAdminAuth(Dashboard);