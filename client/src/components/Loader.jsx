import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulez une progression de chargement en augmentant progress de 1% toutes les 200 ms
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: '0px 0px 20px rgba(0, 123, 255, 0.5)',
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'conic-gradient(#007BFF, transparent)',
            position: 'relative',
          }}
          initial={{ background: 'conic-gradient(#007BFF, transparent)' }}
          animate={{
            background: `conic-gradient(#007BFF ${progress}%, transparent ${progress}%)`,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#007BFF',
            }}
          >
            {progress}%
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
