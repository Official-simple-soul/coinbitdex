import CryptoTable from '~/components/common/CryptoTable';
import UnAuthLayout from '~/layouts/UnAuthLayout';
import { motion } from 'framer-motion';

function CryptoMarket() {
  return (
    <UnAuthLayout>
      {/* Animated Background */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ top: 0, zIndex: 0 }}
      >
        {/* Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
          }}
        />

        {/* Primary Orb - Top Left */}
        <motion.div
          className="absolute rounded-full opacity-30"
          style={{
            width: '600px',
            height: '600px',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '-10%',
            left: '-5%',
          }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Secondary Orb - Bottom Right */}
        <motion.div
          className="absolute rounded-full opacity-25"
          style={{
            width: '550px',
            height: '550px',
            background:
              'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
            filter: 'blur(80px)',
            bottom: '-5%',
            right: '-8%',
          }}
          animate={{ x: [-60, 0, -60], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Accent Orb - Top Right */}
        <motion.div
          className="absolute rounded-full opacity-20"
          style={{
            width: '400px',
            height: '400px',
            background:
              'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
            filter: 'blur(70px)',
            top: '20%',
            right: '5%',
          }}
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 3}px`,
              height: `${3 + Math.random() * 3}px`,
              background: `rgba(${59 + i * 25}, ${130 + i * 15}, ${246 + i * 5}, ${0.3 + Math.random() * 0.3})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${6 + Math.random() * 3}px rgba(59, 130, 246, 0.5)`,
            }}
            animate={{
              y: [-20, 400],
              opacity: [0, 0.6, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container px-5 md:px-0 md:w-[80%] mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="md:w-1/2 flex justify-center md:justify-end mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="font-bold md:font-extrabold mt-8 text-xl md:text-4xl text-white relative"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            All Cryptocurrency Market List
          </motion.h1>
        </motion.div>

        {/* Iframe Section with glassmorphic effect */}
        <motion.div
          className="relative h-64 rounded-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <iframe
            sandbox="allow-same-origin allow-forms allow-popups allow-modals allow-scripts allow-pointer-lock"
            className="wuksD5"
            title="Embedded Content"
            name="htmlComp-iframe"
            width="100%"
            height="100%"
            allow="fullscreen"
            data-src=""
            src="https://tilapia2k19-wixsite-com.filesusr.com/html/c9104a_ad2a1359d70f0851d18ce759d128ef20.html"
          ></iframe>
          <div className="cover w-48 h-9 bg-white absolute bottom-8 right-0"></div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="md:w-1/2 flex justify-center md:justify-end mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.h1
              className="font-bold md:font-extrabold mt-8 text-xl md:text-4xl text-white"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Cryptocurrency Market Prices
            </motion.h1>
          </motion.div>

          {/* Enhanced Table Container */}
          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ boxShadow: '0 20px 60px rgba(59, 130, 246, 0.15)' }}
          >
            <CryptoTable />
          </motion.div>
        </motion.div>
      </div>
    </UnAuthLayout>
  );
}

export default CryptoMarket;
