const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
]

const ImageCarousel = () => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl text-black font-bold mb-4 w-full max-w-[1728px] h-auto leading-[100%] mx-auto">
          Trusted by Members Country-wide
        </h2>
        <p className="text-gray-600 w-full max-w-[773px] text-[32px] sm:text-[24px] space-x-0 text-center mx-auto">
          We blend the best of old-school knowledge with modern tricks to help you form long-lasting healthy habits.
        </p>

        <div className="w-full mt-8">
          <style>{`
            .carousel-container { max-width: 1000px; margin: 0 auto ; }
            .slide { padding: 0 10px; }
            .slide img { width: 100%; height: 350px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            @keyframes scroll-continuous {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .animate-scroll-continuous {
              animation: scroll-continuous 20s linear infinite;
            }
          `}</style>
          <div className="carousel-container">
            <div className="flex overflow-hidden relative">
              <div className="flex animate-scroll-continuous">
                {images.map((imgSrc, index) => (
                  <div key={index} className="slide min-w-[300px]">
                    <img src={imgSrc} alt={`Slide ${index + 1}`} />
                  </div>
                ))}
                {images.map((imgSrc, index) => (
                  <div key={`dup-${index}`} className="slide min-w-[300px]">
                    <img src={imgSrc} alt={`Slide ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel
