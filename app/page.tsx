'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '9A014F17-A6CC-449E-BEEF-5647CDADBC30.jpg',
  'IMG_5606.jpeg',
  'IMG_5714.jpeg',
  'IMG_5647.jpeg',
  'IMG_5611.jpeg',
  'IMG_2843.jpeg',
  'IMG_7754.jpeg',
  'IMG_5894.jpeg',
  'IMG_2557.jpeg',
  'IMG_5816.jpeg',
  'IMG_5683.jpeg',
  'IMG_8801.jpeg',
  'IMG_2667.jpeg',
  'IMG_9483.jpeg',
  'IMG_5588.jpeg',
  'IMG_5707.jpeg',
  'IMG_8532.jpeg',
];

interface Story {
  title: string;
  description: string;
  images: string[];
  mood: string;
}

const gurlzezStories: Story[] = [
  {
    title: "Life in Utrecht",
    description: "In the beautiful city of Utrecht, Gurlzez had wonderful years exploring the canals and charming streets. She loved the cozy Dutch life, the peaceful parks, and lazy afternoons in sunny windows.",
    images: images.slice(0, 4),
    mood: "Nostalgic & Content"
  },
  {
    title: "Adventures & Curiosity",
    description: "Gurlzez is always on the move! Whether it's climbing to new heights, exploring every corner, or pouncing on mysterious moving things, she lives for adventure and discovery. Life is one big playground!",
    images: images.slice(4, 8),
    mood: "Adventurous & Playful"
  },
  {
    title: "Her Love for Kelly",
    description: "Kelly is Gurlzez's favorite person in the whole world. They share special moments together - cuddles, playtime, and that special bond that only a cat and their human can understand. Kelly means everything to her.",
    images: images.slice(8, 12),
    mood: "Loving & Affectionate"
  },
  {
    title: "The Big Move to Johannesburg",
    description: "After wonderful years in Utrecht, Gurlzez embarked on an exciting new adventure! Moving to Johannesburg brought new sights, new warmth, and endless possibilities. She's ready to explore Africa and make new memories with Kelly.",
    images: images.slice(12, 17),
    mood: "Excited & Hopeful"
  },
];

export default function Home() {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [showMood, setShowMood] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  useEffect(() => {
    setShowMood(false);
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, [currentStory]);

  const story = gurlzezStories[currentStory];
  const image = story.images[currentImage];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % story.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + story.images.length) % story.images.length);
  };

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % gurlzezStories.length);
    setCurrentImage(0);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + gurlzezStories.length) % gurlzezStories.length);
    setCurrentImage(0);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {/* Header */}
      <div className={`text-center mb-8 transition-all duration-500 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 drop-shadow-lg">
          ✨ Gurlzez ✨
        </h1>
        <p className="text-xl md:text-2xl text-purple-200">A Cat's Life: From Utrecht to Johannesburg</p>
      </div>

      {/* Main Content */}
      <div className={`max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Image Gallery */}
        <div className="relative bg-black aspect-square md:aspect-video flex items-center justify-center overflow-hidden">
          <img
            src={`/${image}`}
            alt={`${story.title} - ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {currentImage + 1} / {story.images.length}
          </div>

          {/* Navigation Buttons */}
          {story.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black rounded-full p-3 transition-all z-10"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black rounded-full p-3 transition-all z-10"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-3">
            {story.title}
          </h2>

          {/* Mood Button */}
          <button
            onClick={() => setShowMood(!showMood)}
            className="mb-4 inline-block bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            🎭 Mood: {story.mood}
          </button>

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {story.description}
          </p>

          {/* Story Navigation */}
          <div className="flex gap-4 justify-between items-center">
            <button
              onClick={prevStory}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              ← Previous
            </button>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {gurlzezStories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStory(idx);
                    setCurrentImage(0);
                  }}
                  className={`h-3 rounded-full transition-all ${
                    idx === currentStory
                      ? 'bg-purple-600 w-8'
                      : 'bg-purple-300 w-3 hover:bg-purple-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStory}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="mt-12 max-w-4xl w-full">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-white">
          <p className="text-center text-lg mb-4">🐾 Click the hearts to show Gurlzez some love!</p>
          <InteractivePaws />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-purple-200 text-sm">
        <p>Made with 💜 for Gurlzez and Kelly</p>
        <p className="mt-2">From Utrecht with love to Johannesburg with excitement</p>
      </footer>
    </main>
  );
}

function InteractivePaws() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [nextId, setNextId] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: nextId, x, y };
    setHearts((prev) => [...prev, newHeart]);
    setNextId((prev) => prev + 1);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-2xl animate-bounce"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animation: 'float-up 2s ease-out forwards',
          }}
        >
          💜
        </div>
      ))}
      {hearts.length === 0 && (
        <div className="w-full h-full flex items-center justify-center text-2xl">
          Click anywhere! 💜
        </div>
      )}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
