import React from "react";

const colorCombos = [
  { color1: "#FF6B6B", color2: "#FFD93D" },
  { color1: "#6BCB77", color2: "#4D96FF" },
  { color1: "#FF6F91", color2: "#FFC75F" },
  { color1: "#845EC2", color2: "#D65DB1" },
  { color1: "#0081CF", color2: "#FF8066" },
  { color1: "#FF9671", color2: "#00C9A7" },
  { color1: "#00C2A8", color2: "#F9F871" },
  { color1: "#B39CD0", color2: "#FFB085" },
  { color1: "#A0E7E5", color2: "#B4F8C8" },
  { color1: "#FBEAFF", color2: "#FFDEDE" },
  { color1: "#FFAAA7", color2: "#FFD3B6" },
  { color1: "#D291BC", color2: "#957DAD" },
  { color1: "#F8B195", color2: "#F67280" },
  { color1: "#C06C84", color2: "#6C5B7B" },
  { color1: "#355C7D", color2: "#F8B195" },
  { color1: "#99B898", color2: "#FECEAB" },
  { color1: "#E84A5F", color2: "#FF847C" },
  { color1: "#2A363B", color2: "#E84A5F" },
  { color1: "#FF847C", color2: "#FFAAA6" },
  { color1: "#A8E6CF", color2: "#DCEDC1" }
];

const ColorPatternCard = ({ id_model_base }) => {
  // Ajuste: si el id está fuera de rango, usamos el último
  const index = Math.max(0, Math.min(id_model_base - 1, colorCombos.length - 1));
  const { color1, color2 } = colorCombos[index];

  const cardStyle = {
  
    borderRadius: "12px",
    backgroundImage: `repeating-linear-gradient(
      45deg,
      ${color1},
      ${color1} 10px,
      ${color2} 10px,
      ${color2} 20px
    )`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.2rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
   
  };

  return (
    <div className="card_color_pattern" style={cardStyle}>
   
    </div>
  );
};

export default ColorPatternCard;
