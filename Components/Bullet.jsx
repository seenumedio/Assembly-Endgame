import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Bullet = ({ direction }) => {
  return (
    <motion.div
      initial={{ x: direction === "left" ? -40 : 40, opacity: 1 }}
      animate={{
        x: direction === "left" ? "-50vw" : "50vw",
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 3, delay: 1, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "45%",
        transform: "translateY(-50%)",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#FBF7A1",
        [direction === "left" ? "right" : "left"]: "-10px",
      }}
    />
  );
};

export default function BulletShooter({ comrade }) {
  const [bullets, setBullets] = useState([]);

  // Start firing bullets
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets(prev => [
        ...prev,
        { id: Date.now(), direction: "left" },
        { id: Date.now() + 1, direction: "right" },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Remove bullets after they exit screen
  useEffect(() => {
    const cleanup = setInterval(() => {
      setBullets(bullets =>
        bullets.filter(b => Date.now() - b.id < 3000)
      );
    }, 500);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px", // <-- Fixed space between guns and the word
        position: "relative",
        height: "100px", // fixed height for layout control
        overflow: "visible",
      }}
    >
      {/* Right gun */}
      <div style={{ position: "relative", marginTop: "15px" }}>
        <img src="/src/assets/LaserGun.webp" alt="gun" height="40px" />
      </div>

      {/* Word */}
      <div style={{
        display: "flex",
        gap: "5px",
        marginBlock: "5px",
        height: "32px"
      }}>{comrade}</div>

      {/* Left gun */}
      <div style={{ transform: "scaleX(-1)", position: "relative", marginTop: "15px" }}>
        <img src="/src/assets/LaserGun.webp" alt="gun" height="40px" />
      </div>

      {/* Bullets Layer */}
      <AnimatePresence>
        {bullets.map(bullet => (
          <Bullet key={bullet.id} direction={bullet.direction} />
        ))}
      </AnimatePresence>
    </div>
  );
}
