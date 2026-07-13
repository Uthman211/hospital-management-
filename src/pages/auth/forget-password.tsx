import { Link } from "react-router-dom"
import FormInput from "../../components/home/form-input"
import divimage from "../../assets/p-cover.jpg";


function ForgetPassword() {
    return (
        <section className="grid grid-cols-2 h-screen ">
            <div>
                <img src={divimage} alt="" className="w-cover h-full" />

            </div>
            <form action="" className="flex flex-col justify-center items-center p-10 gap-7">

                <div className="w-full">
                    <h1 className="text-xl font-bold text-blue-900">Forget Password</h1>
                    <p>Create a new password for your account</p>
                </div>

                <FormInput
                    type="password"
                    placeholder="Enter new password...."
                    label="New Password"
                    className=""
                />

                <FormInput
                    type="password"
                    placeholder="Confirm new password...."
                    label="Confirm Password"
                    className=""
                />

                <button className="bg-linear-to-r  to-blue-900 from-blue-600 border-none text-white w-full h-10 rounded-md cursor-pointer">Create New Password</button>

                <p>Log in to account ? <Link to={'/login'}>Sign in</Link> </p>
                <p>Don't have an account ? <Link to={'/register'}>Sign up</Link> </p>


            </form>


        </section>
    )
}

export default ForgetPassword