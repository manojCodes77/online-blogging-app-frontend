import React from 'react'
import { Link } from 'react-router-dom'

const SendOTP = () => {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.message) {
                alert(data.message);
                window.location.href = '/signup';
            } else {
                setEmail('');
                throw new Error(data.message || "Unexpected error");
            }
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <div className="my-auto flex items-center justify-center bg-gray-100 mx-5">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden justify-center">
                {/* Left: Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-2xl font-bold text-gray-800">Create an account</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>

                    <form className="mt-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 text-sm text-red-500">{error}</div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
                        >
                            Send OTP
                        </button>
                    </form>
                </div>

                {/* Right: Quote */}
                <div className="hidden md:flex w-1/2 bg-gray-100 flex-col justify-center items-center p-8">
                    <blockquote className="text-lg italic text-gray-600 text-center">
                        “The customer service I received was exceptional. The support team
                        went above and beyond to address my concerns.”
                    </blockquote>
                    <p className="mt-4 text-sm font-semibold text-gray-800 text-center">
                        Jules Winnfield
                        <br />
                        CEO, Acme Inc
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SendOTP
