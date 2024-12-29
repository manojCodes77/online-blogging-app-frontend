import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            {/* Illustration or Icon */}
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 12h.01M14 12h.01M12 16h.01M10 8h.01M14 8h.01M12 4h.01"
                    />
                </svg>
            </div>

            {/* Main Message */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Oops! No Posts Found
            </h1>
            <p className="text-lg text-gray-600 mb-6">
                It seems like there are no posts available at the moment. Please check back later or return to the homepage.
            </p>

            {/* Call to Action */}
            <Link
                to="/blogs"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
}

export default ErrorPage
