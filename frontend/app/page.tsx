import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { movies } from "@/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFD54F] p-8 flex justify-center items-center">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow h-fit">
        <header className="flex items-center justify-between">
          <MenuIcon className="text-gray-800 h-6 w-6" />
          <h1 className="font-bold text-xl">MOVIE UI</h1>
          <SearchIcon className="text-gray-800 h-6 w-6" />
        </header>
        <h2 className="mt-8 mb-6 text-lg font-semibold text-center">
          Most Popular Movies
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-12 w-full max-w-2xl"
        >
          <CarouselContent>
            {movies.map((movie, index) => (
              <CarouselItem
                key={index}
                className=" w-full sm:basis-1/3 lg:basic-1/2"
              >
                <div className="space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Image
                        alt={movie.name}
                        className="rounded-lg"
                        height="700"
                        src={movie.image}
                        style={{
                          aspectRatio: "3/4",
                          objectFit: "cover",
                        }}
                        width="300"
                      />
                    </DialogTrigger>
                    <DialogContent className=" bg-white rounded-lg shadow-lg p-6 flex max-w-2xl">
                      <Image
                        alt={movie.name}
                        className="rounded-lg"
                        height="430"
                        src={movie.image}
                        style={{
                          aspectRatio: "300/430",
                          objectFit: "cover",
                        }}
                        width="300"
                      />
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <DialogTitle className="text-3xl font-bold">
                              {movie.name}
                            </DialogTitle>
                            <p className="text-sm text-gray-500">
                              {movie.time}
                              {` minutes`}
                            </p>
                          </div>
                        </div>
                        <div>
                          <DialogDescription className="text-gray-800">
                            {movie.introduce}
                          </DialogDescription>
                        </div>
                        <div>
                          <Button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            variant="default"
                          >
                            Play Movie
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <h3 className="text-sm font-bold">{movie.name}</h3>
                  <p className="text-xs text-gray-600">
                    {movie.time}
                    {` minutes`}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
