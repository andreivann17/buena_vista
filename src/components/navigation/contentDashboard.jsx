import "../../assets/css/contenido.css";
import {Button,Card} from "react-bootstrap/";
function Content({icon,title,backgroundImage,backgroundStyle }) {
const cardStyle = {

  backgroundSize: '100%', // Incrementa este valor para reducir el "zoom" de la imagen
  backgroundPosition: 'center', 
  backgroundPositionY:"-580px",
 
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  color:"white",
   backgroundImage: `url(${backgroundImage})`,
    color: 'white',
    height:270,

};

  
  const contentStyle = {
    position: 'relative',  // Esto asegura que el texto esté por encima del fondo oscurecido
  };
  return (
    
  <>
  
  <div className="h-100" >
    <Card style={cardStyle} className="">
    <div style={backgroundStyle}></div>
    <div className="h-100" style={contentStyle}>
      <Card.Body className="h-100">
      <div className="d-flex  align-items-center h-100" >
                <div className="d-flex align-items-center h-100">
                  <i style={{ fontSize:32}} className={icon}></i>
                  <h1 style={{ fontSize:32,fontWeight:600}} >{title}</h1>
                </div>
                
              </div>
      </Card.Body>
      </div>
    </Card>
    
</div>
</> 
  );
}
;
export default Content


