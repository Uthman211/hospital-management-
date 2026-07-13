
// import Body from "../../components/herosection"
// import Navbar from "../../components/nav"

import Info from "@/components/home/info"
import Herosection from "../../components/home/hero-section"
import Navbar from "../../components/home/navbar"
import Services from "@/components/home/services"
import Advertisement from "@/components/home/advertisement"
import Doctor from "@/components/home/doctor"
import Question from "@/components/home/question"
import Booking from "@/components/home/booking"
import Footer from "@/components/home/footer"





function Homepage() {

    return (
        <>
            <Navbar />
            <Herosection />
            <Info />
            <Services />
            <Advertisement />
            <Doctor />
            <Question />
            <Booking />
            <Footer />

        </>
    )

}

export default Homepage