// components/CardEmptyDetection.js
import { Card, Button } from "antd";
import { QuestionOutlined,CheckOutlined } from "@ant-design/icons";

const CardEmptyDetection = ({ checkToday, onGoToDetections }) => {
  const hasDetectionToday = Array.isArray(checkToday) && checkToday.length > 0;
  console.log(checkToday)

  return (
    <Card
      style={{
        backgroundColor: "#1c1c1c",
        color: "white",
        borderRadius: 12,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        border: "0",
      }}
    >
      <div>
       

        {hasDetectionToday ? (
          <>
           <CheckOutlined style={{ fontSize: 64, color: "#00c46b" }} />
            <h3 style={{ color: "white", marginTop: 16 }}>You already completed your scan today</h3>
            <p style={{ color: "#ccc" }}>
              Great job! You've taken a step towards monitoring your eye health.
            </p>
          </>
        ) : (
          <>
           <QuestionOutlined style={{ fontSize: 64, color: "#00c46b" }} />
            <h3 style={{ color: "white", marginTop: 16 }}> No detection made today</h3>
            <p style={{ color: "#ccc" }}>
              Start your first scan to take care of your vision.
            </p>
            <Button
              type="primary"
              style={{
                backgroundColor: "#00c46b",
                borderColor: "#00c46b",
                marginTop: 20,
              }}
              onClick={onGoToDetections}
            >
              Go to Detections
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default CardEmptyDetection;
