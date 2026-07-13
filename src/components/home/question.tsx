import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import questions from "../../mocks/question.json"

import { CiCalendar } from "react-icons/ci";



export default function Question() {

  return (
    <section className="grid grid-cols-2 gap-13">

      {/* FIRST PART */}
      <div className=" flex flex-col gap-7 mt-10">
        <button className="text-gray-500 border-white cursor-pointer border px-5 py-1 rounded-xl text-md font-bold mt-10 flex flex-col justify-center uppercase w-max">Knowledge</button>

        <h1 className="text-4xl font-bold ">Frequently Asked <br /> Questions</h1>

        <p className="text-gray-500 text-xl">Finding the right healthcare shouldn't be confusing. Here are answers to <br /> some of the most common questions our patients ask.</p>

        <div className="bg-blue-600 rounded-4xl px-10 py-7">
          <div className="flex gap-4">
            <CiCalendar className=" bg-blue-500 backdrop-blur-sm w-15 h-15 px-3 rounded-2xl" />
            <div>
              <h1 className="font-bold text-xl">Need help?</h1>
              <p>Our support team is active</p>
            </div>
          </div>


          <button className="text-blue-500 bg-white border-white cursor-pointer border px-5 py-1 rounded-xl text-md font-bold mt-10 flex flex-col justify-center uppercase w-full">Contact Support Now</button>
        </div>



      </div>



      {/* OTHER PART */}
      <div className="flex flex-col gap-3 mt-20">


        {
          questions.map((question, i) => (
            <Accordion type="single" collapsible defaultValue={questions[0].question} className="bg-gray-900 rounded-3xl px-10 py-5" key={i}>
              <AccordionItem value={question.question}>
                <AccordionTrigger className="text-1xl font-bold hover:no-underline cursor-pointer">{question.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300 text-[17px] h-full">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        }




      </div>



    </section>




  )

}