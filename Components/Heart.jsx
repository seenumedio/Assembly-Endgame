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
        top: "20%"
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
      <div
        style={{
          marginTop: 32,
          color: "aqua",
          fontSize: 20,
          textAlign: "center",
          fontWeight: "400",
          fontFamily: "Inter, sans-serif",
          letterSpacing: "1px",
          textShadow: "0 2px 12px #0007"
        }}
      >
        Congrats!! <br />'{flames.toUpperCase()}' is your bond.
      </div>
    </div>
  );
}
