import { useAuth } from "../context/authContext";
import { getInitials } from "../utils/getInitials";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-700 dark:text-gray-300">No user data available.</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                {/* Avatar */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center text-white text-3xl font-bold">
                        {getInitials(user.name)}
                    </div>
                </div>

                {/* Info */}
                <h1 className="mt-4 text-center text-2xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400">{user.email}</p>

                {/* Settings / Placeholder */}
                <div className="mt-6 space-y-3">
                    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Account Settings
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Update your profile information, password, and preferences here (coming soon).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
