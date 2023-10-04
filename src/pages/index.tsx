import Card from "@/components/dashboard/Card"
import Accordian from "@/components/landing/Accordian";
// import Table from "@/components/landing/Table";
import Landing from "@/components/landing/Landing";

export default function Home() {
  return (
    <section>
      <Landing/>
      {/* <Table /> */}
      <Accordian/>
    </section>
  )
}
