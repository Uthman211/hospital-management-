import { Link } from "react-router-dom"
import FormInput from "../../components/home/form-input"
import divimage from "../../assets/main-cover.jpg"


function Login() {
    return (
        <section className="grid grid-cols-2 h-screen ">
            <div>
                <img src={divimage} alt="" className="w-cover h-full" />
            </div>
            <form action="" className="flex flex-col justify-center items-center p-10 gap-7 ">

                <div className="w-full">
                    <h1 className="text-xl font-bold text-blue-900">Welcome Back!</h1>
                    <p>Enter your account details to sign in</p>
                </div>

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

                <button className="bg-linear-to-r to-blue-900 from-blue-600 border-none text-white w-full h-10 rounded-md cursor-pointer">Sign In</button>

                <p>Don't have an account ? <Link to={'/register'}>Sign up</Link> </p>
                <p>Forgot your password? <Link to={'/forget-password'}>Reset it</Link> </p>

            </form>


        </section>
    )
}

export default Login