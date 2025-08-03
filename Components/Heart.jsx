import React from "react";
import { motion } from "framer-motion";

export default function BigHeartCongrats({flames}) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position:"absolute",
        top: "15%"
      }}
    >
      <motion.span
        style={{
          fontSize: 160,
          color: "#e25555",
          textShadow: "0 6px 32px #e2555580"
        }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1.1,
          ease: "easeInOut"
        }}
        role="img"
        aria-label="heart"
      >
        {(flames==='love' || flames==='affection') && '❤️'}
        {flames==='friendship' && '🤝🏽'}
        {flames==='marriage' && '💍'}
        {flames === 'enemies' && '🔥'}
        {flames==='siblings' && '🤲🏽'}
      </motion.span>
    </div>
  );
}
