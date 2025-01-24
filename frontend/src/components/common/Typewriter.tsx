import { useEffect, useState } from 'react';

function Typewriter({ text, delay }: { text: string; delay: number }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((c) => c + text[currentIndex]);
        setCurrentIndex((i) => i + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <span>
      {currentText}
      {currentIndex < text.length && <span>|</span>}
    </span>
  );
}

export default Typewriter;
