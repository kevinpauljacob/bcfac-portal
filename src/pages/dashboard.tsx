import React, { useState, useEffect } from "react";
import Search from "@/components/utils/Search";
import Card from "@/components/dashboard/Card";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import withAuth from "@/utils/withAuth";

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
        const querySnapshot = collection(db, "lectures");
        const lecturesQuery = query(
          querySnapshot,
          orderBy("dateOfLecture", "asc")
        );
        const snapshot = await getDocs(lecturesQuery);

        const lectureData: Lecture[] = [];
        snapshot.forEach((doc) => {
          lectureData.push({ id: doc.id, ...doc.data() } as Lecture);
        });
        setLectures(lectureData);
        // console.log(lectureData);
      } catch (error) {
        console.error("Error fetching lectures: ", error);
      }
    };

    fetchLectures();
  }, []);

  return (
    <div>
      <Search />
      <section>
        <h2 className="text-2xl font-bold">Course Materials</h2>
        {lectures.map((lecture) => (
          <Card key={lecture.id} lecture={lecture} />
        ))}
      </section>
    </div>
  );
};

export default withAuth(Dashboard);
