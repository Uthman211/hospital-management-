import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import questions from "../../mocks/question.json"

import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Question() {

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-13 px-5 lg:px-0">

      {/* FIRST PART */}
      <div className="flex flex-col gap-6 sm:gap-7 mt-6 lg:mt-10 px-10">
        <button className="text-gray-500 border-white cursor-pointer border px-5 py-1 rounded-xl text-md font-bold flex flex-col justify-center uppercase w-max">
          Knowledge
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold">
          Frequently Asked <br className="hidden sm:block" /> Questions
        </h1>

        <p className="text-gray-500 text-base sm:text-xl">
          Finding the right healthcare shouldn't be confusing. Here are answers to
          some of the most common questions our patients ask.
        </p>

        <div className="bg-blue-600 rounded-4xl px-6 sm:px-10 py-6 sm:py-7">
          <div className="flex gap-4 items-center">
            <CiCalendar className="bg-blue-500 backdrop-blur-sm w-14 h-14 p-3 rounded-2xl shrink-0" />
            <div>
              <h1 className="font-bold text-lg sm:text-xl">Need help?</h1>
              <p className="text-sm sm:text-base">Our support team is active</p>
            </div>
          </div>

           <Link to={"contact"}><button className="text-blue-500 bg-white border-white cursor-pointer border px-5 py-2 rounded-xl text-sm sm:text-md font-bold mt-8 sm:mt-10 flex flex-col justify-center uppercase w-full">
            Contact Support Now
          </button></Link>
        </div>
      </div>

      {/* OTHER PART */}
      <div className="flex flex-col gap-3 mt-2 lg:mt-20">
        {
          questions.map((question, i) => (
            <Accordion
              type="single"
              collapsible
              defaultValue={questions[0].question}
              className="bg-gray-900 rounded-3xl px-5 sm:px-10 py-4 sm:py-5"
              key={i}
            >
              <AccordionItem value={question.question}>
                <AccordionTrigger className="text-base sm:text-1xl font-bold hover:no-underline cursor-pointer text-left">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-[17px] h-full">
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