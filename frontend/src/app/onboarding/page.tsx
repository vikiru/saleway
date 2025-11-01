import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    preferences: {
      email: true,
      sms: false,
      push: true,
    },
    interests: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked,
      },
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      if (prev.interests.includes(interest)) {
        return {
          ...prev,
          interests: prev.interests.filter(item => item !== interest),
        };
      } else {
        return {
          ...prev,
          interests: [...prev.interests, interest],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome! Let's get started
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Step {step} of 3
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500">
              <div className={`text-center ${step >= 1 ? 'text-indigo-600 font-medium' : ''}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="mt-2 block">Profile</span>
              </div>
              <div className={`text-center ${step >= 2 ? 'text-indigo-600 font-medium' : ''}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="mt-2 block">Interests</span>
              </div>
              <div className={`text-center ${step >= 3 ? 'text-indigo-600 font-medium' : ''}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="mt-2 block">Preferences</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300 ease-in-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Choose a username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="username"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  This will be your public profile name. You can change it later.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 id="interests-label" className="block text-sm font-medium text-gray-700 mb-2">
                    What are you interested in?
                  </h3>
                  <div role="group" aria-labelledby="interests-label">
                  </div>
                  <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="interests-label">
                    {['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports', 'Books'].map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          formData.interests.includes(interest)
                            ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Select at least one category to personalize your experience.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 id="notifications-label" className="block text-sm font-medium text-gray-700 mb-2">
                    Notification preferences
                  </h3>
                  <div role="group" aria-labelledby="notifications-label">
                  </div>
                  <div className="space-y-3" role="group" aria-labelledby="notifications-label">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="email"
                          name="email"
                          type="checkbox"
                          checked={formData.preferences.email}
                          onChange={handlePreferenceChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email" className="font-medium text-gray-700">
                          Email notifications
                        </label>
                        <p className="text-gray-500">Get updates about your orders and recommendations.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="sms"
                          name="sms"
                          type="checkbox"
                          checked={formData.preferences.sms}
                          onChange={handlePreferenceChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="sms" className="font-medium text-gray-700">
                          SMS notifications
                        </label>
                        <p className="text-gray-500">Get order updates via text message.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="push"
                          name="push"
                          type="checkbox"
                          checked={formData.preferences.push}
                          onChange={handlePreferenceChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="push" className="font-medium text-gray-700">
                          Push notifications
                        </label>
                        <p className="text-gray-500">Get updates on your device.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  You can change these settings anytime in your account preferences.
                </p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                )}
              </div>
              <div>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Complete Setup
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/dashboard" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Skip and complete later
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
