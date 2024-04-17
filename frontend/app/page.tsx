export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFD54F] p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <header className="flex items-center justify-between">
          <MenuIcon className="text-gray-800 h-6 w-6" />
          <h1 className="font-bold text-xl">MOVIE UI</h1>
          <SearchIcon className="text-gray-800 h-6 w-6" />
        </header>
        <h2 className="mt-8 mb-6 text-lg font-semibold">Most Popular Movies</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col space-y-2">
            <img
              alt="Room"
              className="rounded-lg"
              height="150"
              src="/placeholder.svg"
              style={{
                aspectRatio: "150/150",
                objectFit: "cover",
              }}
              width="150"
            />
            <h3 className="text-sm font-bold">Room</h3>
            <p className="text-xs text-gray-600">117 min 2015</p>
          </div>
          <div className="flex flex-col space-y-2">
            <img
              alt="Whiplash"
              className="rounded-lg"
              height="150"
              src="/placeholder.svg"
              style={{
                aspectRatio: "150/150",
                objectFit: "cover",
              }}
              width="150"
            />
            <h3 className="text-sm font-bold">Whiplash</h3>
            <p className="text-xs text-gray-600">167 min 2015</p>
          </div>
          <div className="flex flex-col space-y-2">
            <img
              alt="Mad Max"
              className="rounded-lg"
              height="150"
              src="/placeholder.svg"
              style={{
                aspectRatio: "150/150",
                objectFit: "cover",
              }}
              width="150"
            />
            <h3 className="text-sm font-bold">Mad Max</h3>
            <p className="text-xs text-gray-600">120 min 2015</p>
          </div>
          <div className="flex flex-col space-y-2">
            <img
              alt="The Revenant"
              className="rounded-lg"
              height="150"
              src="/placeholder.svg"
              style={{
                aspectRatio: "150/150",
                objectFit: "cover",
              }}
              width="150"
            />
            <h3 className="text-sm font-bold">The Revenant</h3>
            <p className="text-xs text-gray-600">156 min 2015</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
