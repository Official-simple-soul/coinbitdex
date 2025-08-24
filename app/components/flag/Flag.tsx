function Flag() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-center px-4">
      {/* Vercel Logo */}
      <img
        src="https://assets.vercel.com/image/upload/v1662130559/front/zeit/og.png"
        alt="Vercel Logo"
        className="w-32 mb-6"
      />

      {/* Title */}
      <h1 className="text-xl md:text-3xl font-bold text-white mb-4">
        Your deployment has been<br></br>taken down
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-sm md:text-base max-w-md mb-2">
        This happened due to multiple reports on your site. Please contact
        vercel support if you believe this is a mistake.
      </p>

      {/* Warning */}
      <p className="text-red-400 text-xs md:text-sm max-w-md">
        You have <span className="font-semibold">24 hours</span> to contact
        vercel support before your site is removed entirely.
      </p>
    </div>
  );
}

export default Flag;
