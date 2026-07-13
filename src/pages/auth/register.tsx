import { Link } from "react-router-dom"
import FormInput from "../../components/home/form-input"
import divimage from "../../assets/blueco-signup.jpg"



function Register() {
    return (
        <section className="grid grid-cols-2 h-screen ">
            <div>
                <img src={divimage} alt="" className="w-cover h-full" />
            </div>
            <form action="" className="flex flex-col justify-center items-center p-10 gap-7 bg-white-900">

                <div className="w-full">
                    <h1 className="text-xl font-bold text-blue-900">Welcome !</h1>
                    <p>Enter your details to sign up</p>
                </div>

                <FormInput
                    type="text"
                    placeholder="Enter your Username...."
                    label="Username"
                    className=""
                />

                <FormInput
                    type="email"
                    placeholder="Enter your email...."
                    label="Email"
                    className=""
                />

                <FormInput
                    type="password"
                    placeholder="Enter your password...."
                    label="Password"
                    className=""
                />

                <button className="bg-linear-to-r  to-blue-900 from-blue-600 border-none text-white w-full h-10 rounded-md cursor-pointer">Sign Up</button>

                <p>Log in to account ? <Link to={'/login'}>Sign in</Link> </p>
                <p>Forgot your password? <Link to={'/forget-password'}>Reset it</Link> </p>

            </form>


        </section>
    )

}

export default Register