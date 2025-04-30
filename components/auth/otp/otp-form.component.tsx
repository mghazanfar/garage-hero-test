"use client";
import { Button, Alert } from "flowbite-react";

interface OtpFormComponentProps {
  email: string;
  otp: string[];
  isLoading: boolean;
  error: { message: string } | null;
  onOtpChange: (index: number, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function OtpFormComponent({
  email,
  otp,
  isLoading,
  error,
  onOtpChange,
  onSubmit,
}: OtpFormComponentProps) {
  return (
    <section className="bg-white px-4 py-8 dark:bg-gray-900 lg:py-0">
      <div className="lg:flex">
        <div className="bg-primary-600 hidden w-full max-w-md p-12 lg:block lg:h-screen">
          <div className="mb-8 flex items-center space-x-4">
            <a href="#" className="flex items-center text-2xl font-semibold text-white">
              <img alt="" src="./gh_small_logo.svg" className="mr-2 size-11" />
            </a>
            <a
              href="/login"
              className="text-primary-100 inline-flex items-center text-sm font-medium hover:text-white"
            >
              <svg
                className="mr-1 size-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Go back
            </a>
          </div>
        </div>
        <div className="mx-auto flex items-center md:w-[42rem] md:px-8 xl:px-0">
          <div className="w-full">
            <div className="mb-8 flex items-center justify-center space-x-4 lg:hidden">
              <a href="#" className="flex items-center text-2xl font-semibold">
                <img
                  alt=""
                  className="mr-2 size-8"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                />
                <span className="text-gray-900 dark:text-white">Flowbite</span>
              </a>
            </div>
            <h1 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              Verify your email address
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              We emailed you a six-digit code to&nbsp;
              <span className="font-medium text-gray-900 dark:text-white">
                {email}
              </span>
              . Enter the code below to confirm your email address.
            </p>
            {error && (
              <Alert color="failure" className="my-4">
                {error.message}
              </Alert>
            )}
            <form onSubmit={onSubmit}>
              <div className="my-4 flex space-x-2 sm:space-x-4 md:my-6">
                {otp.map((digit, index) => (
                  <div key={index}>
                    <label htmlFor={`code-${index + 1}`} className="sr-only">
                      {`Digit ${index + 1}`}
                    </label>
                    <input
                      id={`code-${index + 1}`}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => onOtpChange(index, e.target.value)}
                      required
                      type="text"
                      className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                    />
                  </div>
                ))}
              </div>
              <p className="mb-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400 md:mb-6">
                Make sure to keep this window open while checking your inbox.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="submit"
                  size="xl"
                  className="[&>span]:text-sm bg-ghred-500 hover:bg-ghred-600 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify account"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 