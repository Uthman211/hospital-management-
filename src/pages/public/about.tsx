import Experience from "@/components/about/experience"
import Journey from "@/components/about/journey"
import Leadership from "@/components/about/leadership"
import Partners from "@/components/about/partners"
import Philosophy from "@/components/about/philosophy"
import Story from "@/components/about/story"
import Footer from "@/components/home/footer"
import Navbar from "@/components/home/navbar"


function AboutUs() {
    return (
        <>
        <Navbar />
            <Story />
            <Philosophy />
            <Journey />
            <Leadership />
            <Partners />
            <Experience />
            <Footer />
        </>

    )


}

export default AboutUs